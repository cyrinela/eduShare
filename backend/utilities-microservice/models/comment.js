import mongoose from 'mongoose'; 
 
const commentSchema = new mongoose.Schema({ 
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
 
const Comment = mongoose.model('Comment', commentSchema); 
 
export default Comment; 