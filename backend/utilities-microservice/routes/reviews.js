import express from 'express';
import { addReview, getMyReviews, getReviews } from '../controllers/reviewController.js';



const router = express.Router();

router.get('/all', getReviews);

router.get('/myreviews', getMyReviews)

router.post('/add', addReview);

export default router;