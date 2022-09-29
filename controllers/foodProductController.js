const db = require("../models");

// create main Model
const FoodProduct = db.foodProduct;
const Review = db.reviews

// 1. create product

const foodaddProduct = async (req, res) => {

  let info = {
    image: req.file.filename,
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };

  const Products = await FoodProduct.create(info);
  res.status(200).send(Products);
};

// 2. get all products

const getAllFoodProducts = async (req, res) => {

    let products = await FoodProduct.findAll({})
    res.status(200).send(products)

}

// 3. get single product

const getOneFoodProduct = async (req, res) => {

    let id = req.params.id
    let product = await FoodProduct.findOne({ where: { id: id }})
    // console.log("jdncj",product ,"mdm");
    res.status(200).send(product)

}

// 4. update Product

const updateFoodProduct = async (req, res) => {

    let id = req.params.id

    const product = await FoodProduct.update(req.body, { where: { id: id }})

    res.status(200).send(product)
   

}

// 5. delete product by id

const deleteFoodProduct = async (req, res) => {

    let id = req.params.id
    
    await FoodProduct.destroy({ where: { id: id }} )

    res.status(200).send(' Food Product is deleted !')

}


const getFoodProductReviews =  async (req, res) => {

  const id = req.params.id

  const data = await FoodProduct.findOne({
      include: [{
          model: Review,
          as: 'review'
      }],
      where: { id: id }
  })

  res.status(200).send(data)

}

module.exports = {
  foodaddProduct,
  getAllFoodProducts,
  getOneFoodProduct,
  deleteFoodProduct,
  updateFoodProduct,
  getFoodProductReviews,
};
