import pool from '../config/db.js';
import { log, error } from '../utils/logger.js';

export const listUsers = async (req, res) => {
  try {
    const conn = await pool.getConnection();
    try {
      const [rows] = await conn.query('SELECT id, email, name, role, google_id, created_at FROM users');
      res.json(rows);
    } finally {
      conn.release();
    }
  } catch (error) {
    error('listUsers error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const conn = await pool.getConnection();
    try {
      const [rows] = await conn.query('SELECT id, email, name, role, google_id, created_at FROM users WHERE id = ?', [id]);
      if (!rows.length) return res.status(404).json({ error: 'User not found' });
      res.json(rows[0]);
    } finally {
      conn.release();
    }
  } catch (error) {
    error('getUser error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const createUser = async (req, res) => {
  const { email, name } = req.body;
  try {
    const conn = await pool.getConnection();
    try {
      const [rows] = await conn.query('INSERT INTO users (email, name) VALUES (?, ?)', [email, name]);
      res.status(201).json({ message: "User created successfully.", code: 201 });
    } finally {
      conn.release();
    }
  } catch (error) {
    error('createUser error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { email, name, role } = req.body;
  try {
    const conn = await pool.getConnection();
    try {
      await conn.query('UPDATE users SET email = ?, name = ?, role = ? WHERE id = ?', [email, name, role || 'user', id]);
      res.json({ message: 'User details update successfully.', code: 200});
    } finally {
      conn.release();
    }
  } catch (error) {
    error('updateUser error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const conn = await pool.getConnection();
    try {
      await conn.query('DELETE FROM users WHERE id = ?', [id]);
       res.json({ message: 'User deleted successfully.', code: 200 });
    } finally {
      conn.release();
    }
  } catch (error) {
    error('deleteUser error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
