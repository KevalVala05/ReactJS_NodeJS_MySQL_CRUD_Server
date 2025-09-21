import dotenv from 'dotenv';
dotenv.config();
import { google } from 'googleapis';
import pool from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { log, error } from '../utils/logger.js';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export const getAuthUrl = (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['profile', 'email'],
    prompt: 'select_account'
  });
  res.json({ url });
};

// Called by Google to our redirect URI with ?code=...
export const oauth2callback = async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send('Missing code');
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // get userinfo
    const oauth2 = google.oauth2({ auth: oauth2Client, version: 'v2' });
    const { data } = await oauth2.userinfo.get();
    // data contains id, email, name, picture
    const { id: googleId, email, name } = data;

    // upsert user
    const conn = await pool.getConnection();
    try {
      const [rows] = await conn.query('SELECT * FROM users WHERE email = ?', [email]);
      let user;
      if (rows.length === 0) {
        const [resInsert] = await conn.query(
          'INSERT INTO users (google_id, email, name) VALUES (?, ?, ?)',
          [googleId, email, name]
        );
        user = { id: resInsert.insertId, google_id: googleId, email, name };
      } else {
        user = rows[0];
        // update google_id if missing
        if (!user.google_id) {
          await conn.query('UPDATE users SET google_id = ? WHERE id = ?', [googleId, user.id]);
        }
      }

      // Create JWT
      const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d'
      });

      // redirect to frontend with token (or respond JSON if called from backend)
      // For server-side redirect:
      res.redirect(`${process.env.FRONTEND_URL}/auth-success?token=${token}`);
    } finally {
      conn.release();
    }
  } catch (err) {
    error('OAuth callback error:', err);
    res.status(500).send('Authentication failed');
  }
};

