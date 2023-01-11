const express = require('express');
const dotenv = require("dotenv");
const routes = require('./routes/Routes.js')
const ConnectDb = require('./Config/config')
var cors = require('cors')

const app = express();

app.use(express.json());
app.use(cors());

dotenv.config({path:"config.env"})
const PORT = process.env.PORT || 8080;

ConnectDb()

app.listen(PORT,()=>{
    console.log(`Listening at port ${PORT}`)
})
  
// send response in json
app.use(express.json());

// all routes
app.use(routes);