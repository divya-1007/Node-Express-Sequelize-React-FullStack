const db = require('../models')

// model
const Review = db.reviews

// functions

//1. Add Review

const addReview = async (req, res) => {
    let data ;
    const id = req.body.product_id
    if(id ===id){
     data = {
        product_id: id,
        foodproduct_id:0,
        rating: req.body.rating,
        description: req.body.description
    }
    }else{
        data = {
            product_id: 0,
            foodproduct_id: req.body.food_id,
            rating: req.body.rating,
            description: req.body.description
        }
    }

    const review = await Review.create(data)
    res.status(200).send(review)

}

// 2. Get All Reviews

const getAllReviews = async (req, res) => {

    const reviews = await Review.findAll({})
    res.status(200).send(reviews)

}

module.exports = {
    addReview,
    getAllReviews
}