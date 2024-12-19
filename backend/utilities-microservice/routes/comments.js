import express from 'express';



const router = express.Router();

router.get('/all', (req,res) => {
    console.log("SHOW ALL COMMENTS");
    
    res.json({result:"SHOW ALL COMMENTS"})
})

export default router;