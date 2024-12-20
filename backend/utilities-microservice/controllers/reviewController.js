import Review from "../models/review.js"

export const addReview = async (req, res) => {
    const newReview = new Review(req.body);
    await newReview.save().catch((error) => {
        console.log(error);
    });

    res.status(201).send("Review added!");
}

export const getReviews = async (req, res) => {
    const ResId = req.query.id;

    const results = await Review.find({RessourceId: ResId})
    .catch((error) => {console.log(error);});

    res.status(200).json(results);
}