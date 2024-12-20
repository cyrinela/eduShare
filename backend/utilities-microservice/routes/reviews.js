import express from 'express';
import { addReview, getReviews } from '../controllers/reviewController.js';



const router = express.Router();

router.get('/all', getReviews);

router.post('/add', addReview);

export default router;