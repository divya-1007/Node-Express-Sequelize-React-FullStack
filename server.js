const express = require('express')
const cors = require('cors')


const app = express()

// middleware

app.use(express.json())
app.use(cors());

app.use(express.urlencoded({ extended: true }))
app.post('/', (request, response) => {
  response.send("Client libraries make it easier to access Google Cloud APIs using a supported language")
})

// routers
const router = require('./routes/productRouter.js')
app.use('/api/products', router)

//static Images Folder

app.use('/uploads', express.static(__dirname + '/uploads'))
app.use((req, res, next) => {
  if (req.originalUrl === '/webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});
// stripe
// app.use(
//     express.json({
//       // We need the raw body to verify webhook signatures.
//       // Let's compute it only when hitting the Stripe webhook endpoint.
//       verify: function(req, res, buf) {
//         // if (req.originalUrl.includes('/webhook')) {
//           req.body = buf.toString();
//         // }
//       }
//     })
//   );

// port
const PORT =  8001

//server

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})