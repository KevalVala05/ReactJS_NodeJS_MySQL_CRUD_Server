import { db } from '../config/db.js';

export const findOrCreateUser = (profile, callback) => {
  const { id, displayName, emails } = profile;
  db.query('SELECT * FROM users WHERE google_id = ?', [id], (err, results) => {
    if (err) return callback(err, null);
    if (results.length > 0) return callback(null, results[0]);

    // Create new user
    const newUser = {
      google_id: id,
      name: displayName,
      email: emails[0].value
    };
    db.query('INSERT INTO users SET ?', newUser, (err, res) => {
      if (err) return callback(err, null);
      callback(null, newUser);
    });
  });
};
