const express = require('express');
const route = require('./routes/route.js');
const mongoose = require('mongoose');
const multer = require('multer');
const app = express();



app.use(express.json()); //express.json();
app.use(multer().any());    //without it req.files = undefined , if file missing in req => req.files = []
app.use('/', route);

require("dotenv").config()

mongoose.connect("process.env.MONGOURL", {    //
  useNewUrlParser: true
})
.then(function(){
  console.log("Mongodb is connected successfully.✔🟢✅");
})
.catch(function(err){
  console.log(err)
})


app.listen(process.env.PORT || 3000, function(){return console.log(`Express is running on port ${process.env.PORT || 3000}`)});
