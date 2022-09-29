const db = require('../models');
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const jsonwebtoken = 'Sr43sw4WTnOUIEw96t7Sgzela5344Z6al8CPR7WSaTM'
const dialogflow = require('@google-cloud/dialogflow');
const Config = require('../config/devKey')
const uuid = require('uuid');
const Razorpay = require('razorpay'); 
const crypto = require('crypto');
var axios = require('axios');

const instance = new Razorpay({
  key_id: 'rzp_test_RmXTL8t1xhHvgJ',
  key_secret: 'cXeR8V1RfGWX0tDOwaXmpKsq',
});

const Users = db.users;
const Order = db.order;


const userCreates = async(req,res)=>{
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(req.body.password, salt);
let info = {
    username: req.body.username,
    password: hashedPassword,
    email: req.body.email,
    phone: req.body.phone,
    role: 1
}
const register = await Users.create(info)
res.status(200).send(register)
}

const login = async(req,res) =>{
    try {
        const { username, email, password } = req.body;

        const Check_user = await Users.findOne({ where: { username: username }});
        if (Check_user === null) {
            return res.json({
              status: 0,
              message: "Username Not Found",
            });
          }
    
          const validPass = await bcrypt.compare(password, Check_user.password);
    
          if (!validPass) {
            return res.json({
                status: 0,
                message: `Invalid Password, Enter Correct Password`,
              });
             
          }
    
          const token = jwt.sign(
            { key: Check_user._id, role: Check_user.role },
            jsonwebtoken,
            { expiresIn: "87660h" }
          );
      
          let details = {
            email: Check_user.email,
            userId: Check_user.id,
            username: Check_user.username,
            token: token,
            role: Check_user.role,
          };
          return res.json({
            status: 1,
            message: `Success`,
            user: details,
            token: token
          });
      
    } catch (error) {
      return res.json({
      status: 0,
      message: error,
      });
    }
}

const paymentMethods = async(req,res)=>{
try {
  var options = {
    amount: req.body.amount*100,  
    currency: "INR",
    receipt: crypto.randomBytes(10).toString("hex"),
  }

  instance.orders.create(options, (error, order) =>{
    if(error){
      return res.json({
        status: 0,
        message: error,
      });
    }
    return res.json({
      status: 0,
      message: order,
    });

  });
  
} catch (error) {
  return res.json({
    status: 0,
    message: error,
  });
}
}  

const pymentVerfy = async(req,res)=>{
  try {
    const secretKey = "cXeR8V1RfGWX0tDOwaXmpKsq"
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body;

    const signature = razorpay_order_id+"|"+razorpay_payment_id;
    const expectedSign = crypto.createHmac("sha256",secretKey).update(signature.toString()).digest("hex");
    var config = {
      method: 'get',
      url: `https://api.razorpay.com/v1/orders/${razorpay_order_id}`,
      headers: { 
        'Authorization': 'Basic cnpwX3Rlc3RfUm1YVEw4dDF4aEh2Z0o6Y1hlUjhWMVJmR1dYMHRET3dhWG1wS3Nx'
      }
    };
    
    axios(config)
    .then( async(response)=> {
      const responseData = response.data ;
      const paymentOrder = {
        product_id:req.params.id,
        paymentId:responseData.id,
        amount:responseData.amount,
        amount_paid:responseData.amount_paid,
        currency:responseData.currency,
        receipt:responseData.receipt,
        statu:responseData.status,
      }
    const register = await Order.create(paymentOrder)
    if(razorpay_signature === expectedSign && register !== null ){
      return res.json({
        status: 1,
        register:register,
        message: "Payment Verfy Sucessfully!",
      });
    }else{
      return res.json({
        status: 0,
        message: "Invalide signature Sent!",
      });
    }
    })
    .catch(function (error) {
      return res.json({
        status: 0,
        message: error,
      });
    });
  } catch (error) {
    return res.json({
      status: 0,
      message: error,
    });
  }
}


const OrderList = async(req,res)=>{
 try {
  var config = {
    method: 'get',
    url: 'https://api.razorpay.com/v1/orders',
    headers: { 
      'Authorization': 'Basic cnpwX3Rlc3RfUm1YVEw4dDF4aEh2Z0o6Y1hlUjhWMVJmR1dYMHRET3dhWG1wS3Nx'
    }
  };
  
  axios(config)
  .then(function (response) {
    const orderData = response.data;
    return res.json({
      status: 0,
      data: orderData,
    });
  })
  .catch(function (error) {
    return res.json({
      status: 0,
      message: error,
    });;
  });
 } catch (error) {
  return res.json({
    status: 0,
    message: error,
  });
 }
}

/**
 * Send a query to the dialogflow agent, and return the query result.
//  * @param {string} projectId The project to be used
 */
const projectId = Config.project_id;

const credentials = {
  client_email: Config.client_email,
  private_key: Config.private_key
}

// console.log(credentials ,"credentials");
const sessionClient = new dialogflow.SessionsClient({projectId,credentials});
 
const textQueryData = async(userText )=>{
  const sessionId = uuid.v4();
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: userText,
        // The language used by the client (en-US)
        languageCode: 'en-US',
      },
    },
  };


  const [response] = await sessionClient.detectIntent(request);
  // // const responses = await sessionClient.detectIntent(request);
  // const result = response.queryResult
  console.log('Detected intent',response);
   
 
  
}

const textQuery = async(req ,res)=>{
  try {
    const { text,userId} = req.body
    const responseData = await textQueryData(text,userId)
    // console.log(responseData);
      res.send("text Query")
  } catch (error) {
    console.log(error);
  }
}


module.exports = {
    userCreates,
    login,
    textQuery,
    paymentMethods,
    pymentVerfy,
    OrderList,
}


// async function runSample(projectId = Config.project_id) {
//  // A unique identifier for the given session
//  const sessionId = uuid.v4();

//  // Create a new session
//  const sessionClient = new dialogflow.SessionsClient({projectId ,credentials});
//  const sessionPath = sessionClient.projectAgentSessionPath (projectId, sessionId);

//  // The text query request.
//  const request = {
//    session: sessionPath,
//    queryInput: {
//      text: {
//        // The query to send to the dialogflow agent
//        text: 'hello',
//        // The language used by the client (en-US)
//        languageCode: 'en-US',
//      },
//    },
//  };

//  // Send request and log result
//  const responses = await sessionClient.detectIntent(request);
//  console.log('Detected intent');
//  const result = responses[0].queryResult;
//  console.log(`  Query: ${result.queryText}`);
//  console.log(`  Response: ${result.fulfillmentText}`);
//  if (result.intent) {
//    console.log(`  Intent: ${result.intent.displayName}`);
//  } else {
//    console.log(`  No intent matched.`);
//  }
// }