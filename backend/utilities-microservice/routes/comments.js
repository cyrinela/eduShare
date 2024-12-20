import express from 'express';
import { addComment, deleteComment, getComments } from '../controllers/commentController.js';



const router = express.Router();

router.get('/all', getComments);

router.post('/add', addComment);

router.delete('/', deleteComment)

export default router;