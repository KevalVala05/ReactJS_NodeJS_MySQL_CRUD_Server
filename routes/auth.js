import express from 'express';
import { getAuthUrl, oauth2callback } from '../controllers/authController.js';
const router = express.Router();

router.get('/auth-url', getAuthUrl);
router.get('/oauth2callback', oauth2callback);

export default router;
