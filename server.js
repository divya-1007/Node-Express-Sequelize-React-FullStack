require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()

// middleware

app.use(express.json())
app.use(cors());

app.use(express.urlencoded({ extended: true }))
// app.get('/', (request, response) => {
//   response.send("Client libraries make it easier to access Google Cloud APIs using a supported language")
// })
var distDir = __dirname + "/dist/";

app.use(express.static(distDir));
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

// port
const PORT = process.env.PORT|| 8080 
app.set("port",PORT)
//server

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
