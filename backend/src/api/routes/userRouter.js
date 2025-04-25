import express from 'express';
import {
  handleEmailAvailable,
  handlePostUser,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/', handlePostUser);
router.get('/available/:email', handleEmailAvailable);

export default router;
