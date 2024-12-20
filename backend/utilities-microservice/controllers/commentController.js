import Comment from "../models/comment.js"


export const addComment = async (req, res) => {
        const newComment = new Comment(req.body);
        await newComment.save().catch((error) => {
            console.log(error);
            
        });
        res.status(201).send("Comment added successfully");
}

export const getComments = async (req,res) => {
    const ResId = req.query.id;
    const results = await Comment.find({RessourceId: ResId})
    .catch((error) => {console.log(error);});

    res.json(results);
}

export const deleteComment = async (req, res) => {
    const {commentId ,resId, userId} = req.query;
    await Comment.deleteOne({_id: commentId , RessourceId: resId, userId: userId})
    .catch((error) => {console.log(error);})

    res.status(204).send("Comment deleted!")
}
