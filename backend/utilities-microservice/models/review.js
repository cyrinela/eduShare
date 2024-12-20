import mongoose from 'mongoose'; 

const reviewSchema = new mongoose.Schema({ 
    rating: { 
        type: Number,
        required: true
    },
    text: {
        type: String, 
        required: true 
    },
    userId: { 
        type: String, 
        required: true 
    },
    RessourceId: { 
        type: Number, 
        required: true 
    },
}); 

const Review = mongoose.model('Review', reviewSchema); 
 
export default Review;