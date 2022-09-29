const Moment = require('moment');
const db = require('../models');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);

const stripe = require("stripe")("sk_test_51LPMF4SGjWlrXrExiI37DlvTZh6rKJm45VJ2Pgj1zd7lAuYZhoqU8z3WInbt7vILuTSoCeTTFLRe5X2qFGnWzOCY004v2ZjT5R");
function broofa() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}
const idData = broofa()
const Order = db.order;


const payment = async (req, res) => {
let error;
let status;
try {
 
 const customer = await stripe.customers.create({
        metadata: {
        userId: req.body.id,
        cart: JSON.stringify(req.body.cartItems),
        },
    })
   
    const line_items = req.body.cartItems.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
              images: [item.image],
              description: "Client libraries make it easier to access Google Cloud APIs using a supported language",
              metadata: {
                id: item.id,
              },
            },
            unit_amount: item.amount,
          },
          quantity: item.cartQuantity,
        };
      });


      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_address_collection: {
          allowed_countries: ["US", "CA", "KE" ,"IN"],
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 0,
                currency: "usd",
              },
              display_name: "Free shipping",
              // Delivers between 5-7 business days
              delivery_estimate: {
                minimum: {
                  unit: "business_day",
                  value: 5,
                },
                maximum: {
                  unit: "business_day",
                  value: 7,
                },
              },
            },
          },
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 1500,
                currency: "usd",
              },
              display_name: "Next day air",
              // Delivers in exactly 1 business day
              delivery_estimate: {
                minimum: {
                  unit: "business_day",
                  value: 1,
                },
                maximum: {
                  unit: "business_day",
                  value: 1,
                },
              },
            },
          },
        ],
        phone_number_collection: {
          enabled: false,
        },
        line_items,
        mode: "payment",
        customer: customer.id,
        success_url: `https://www.google.com/`,
        cancel_url: `https://www.google.com/`,
      });
     
       const paymentIntent = await  stripe.checkout.sessions.retrieve(session.id,)
        
    status = paymentIntent.url;
} catch (error) {
console.error("Error:", error.stack);
status = "failure";
}
res.json({ error, status});
    
}

const createToken = async (sessionData) => {
    const paymentOrder = {
        product_id:14,
        paymentId:0,
        amount:sessionData[0].amount,
        currency:sessionData[0].description,
      }
    return await Order.create(paymentOrder)
}

const secretPayment = async(req,res)=>{
  const { products } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      description:products.description,
      shipping: {
        name: products.name,
        address: {
          line1: products.line1,
          postal_code:products.postal_code,
          city: products.city,
          state: 'CA',
          country: 'US',
        },
      },
      metadata:{
        Order:products.id,
        name:`${products.name} Chourasiya`,
        address:`${products.line1} ${products.postal_code} ${products.city} ${products.state} ${products.country}`,
        description: products.description,
       },
      amount: (products.price*products.quantity)*100,
      currency: 'inr',
      payment_method_types: ['card'],
      
    });

    res.status(200).json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, message: error.message });
  }
}

const paymentDataSave = async(valData)=>{
 const paymentOrder = {
  foodproduct_id:parseInt(valData.metadata.Order),
  paymentId:valData.id,
  amount:valData.amount,
  amount_paid:valData.amount_captured,
  currency:valData.currency,
  receipt:valData.receipt_url,
  statu:valData.status,
}
const register = await Order.create(paymentOrder)
if(valData.status === 'succeeded'  && register !== null ){
  return register
}

}


 module.exports = {
    payment ,
    secretPayment,
    paymentDataSave
 }