// import controllers review, products
const reviewController = require('../controllers/reviewController');
const userController = require('../controllers/userController');
const productController = require('../controllers/productController.js');
const foodproductController = require('../controllers/foodProductController');
const paymentController = require('../controllers/stripePaymentController');
const stripe =  require("stripe")("sk_test_51LPMF4SGjWlrXrExiI37DlvTZh6rKJm45VJ2Pgj1zd7lAuYZhoqU8z3WInbt7vILuTSoCeTTFLRe5X2qFGnWzOCY004v2ZjT5R");
;
const express = require('express');

// router
const router = require('express').Router()

// userCreate
router.post('/userCreate',userController.userCreates)
router.post('/login',userController.login)

router.post('/chatbot',userController.textQuery)

// order 
router.post('/payment',userController.paymentMethods)
router.post('/verify/:id',userController.pymentVerfy)
router.get('/paymentList',userController.OrderList)


// food Products routers
router.post('/foodaddProduct', productController.upload , foodproductController.foodaddProduct)
router.get('/allfoodProducts', foodproductController.getAllFoodProducts)
router.get('/allProducts', productController.getAllProducts)
router.get('/:id', foodproductController.getOneFoodProduct)
router.put('/:id', foodproductController.updateFoodProduct)
router.delete('/:id', foodproductController.deleteFoodProduct)
router.get('/foodproduct/:id', foodproductController.getFoodProductReviews)

// Review Url and Controller
router.get('/allReviews', reviewController.getAllReviews)
router.post('/addReview', reviewController.addReview)

// get product Reviews
router.get('/getProductReviews/:id', productController.getProductReviews)

// Products router
router.post('/addProduct', productController.upload , productController.addProduct)
router.get('/published', productController.getPublishedProduct)
router.get('/:id', productController.getOneProduct)
router.put('/:id', productController.updateProduct)
router.delete('/:id', productController.deleteProduct)

// Payment Stripe
router.post('/paymentstripe',  paymentController.payment);
router.post('/secret',  paymentController.secretPayment);


// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_e325cebc16ca2bd8db2405e73ca6697d0736162f92ed2e4e72fa326aea1c69fe";

router.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
//   const sig = request.headers['stripe-signature'];
  let data;
  let eventType;

  // Check if webhook signing is configured.
  let webhookSecret;
  //webhookSecret = process.env.STRIPE_WEB_HOOK;

  if (webhookSecret) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    let signature = req.headers["stripe-signature"];

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        webhookSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed:  ${err}`);
      return res.sendStatus(400);
    }
    // Extract the object from the event.
    data = event.data.object;
    eventType = event.type;
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // retrieve the event data directly from the request body.
    data = req.body.data.object;
    eventType = req.body.type;
  }

  // Handle the event
  if (eventType === "checkout.session.completed") {
     stripe.customers.retrieve(data.customer)
      .then(async (customer) => {
        try {
          // CREATE ORDER
          createOrder(customer, data);
        } catch (err) {
          console.log(typeof createOrder);
          console.log(err);
        }
      })
      .catch((err) => console.log(err.message));
  }
//  switch (eventType) {
//     case 'payment_intent.created':
//         const paymentMethod = data;
//         console.log('PaymentIntent was created!');
//         break;
//     case 'payment_intent.succeeded':
//         console.log('PaymentIntent was successful!');
//         break;
//     case 'payment_method.attached':
//         console.log('PaymentMethod was attached to a Customer!');
//         break;
//     case 'payment_method.created':
//         console.log('PaymentMethod was created!');
//         break;
//     case 'charge.succeeded':
//     const succeeded = paymentController.paymentDataSave(data)
//         console.log("succeeded" ,succeeded);
//         console.log('Charge was successful!');
//         break;
//     case 'payment_intent.payment_failed':
//         console.log('Payment failed!');
//         return res.status(400).end();
//     default:
//         // Unexpected event type
//         return res.status(400).end();
//     }
  




  // Return a 200 response to acknowledge receipt of the event
  res.send();
});

const createOrder = async(customer, data)=>{
    console.log('checkout session completed successful');
}

module.exports = router