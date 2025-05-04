import express from 'express';
import {
  handleDeleteUser,
  handleEmailAvailable,
  handlePostUser,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/', handlePostUser);
router.get('/available/:email', handleEmailAvailable);
router.delete('/:id', handleDeleteUser);

export default router;
