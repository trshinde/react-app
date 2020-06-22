const express = require("express");
const app = express();
// const path = require("path");
const cors = require('cors')
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 5000;
const config = require('./config/config').get(process.env.NODE_ENV);

// const config = require("./config/key");

mongoose.connect(config.DATABASE, { 
  useNewUrlParser: true, 
  useUnifiedTopology:true, 
  useCreateIndex:true, 
  useFindAndModify:false 
});


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));
app.use('/api/users', require('./routes/users'));
app.use('/api/favorite',require('./routes/favorite'));


app.listen(port, () => {
  console.log(`Server Listening on ${port}`)
});