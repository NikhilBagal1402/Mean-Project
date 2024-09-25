const express = require("express");
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const postRoutes = require('./routes/posts')

mongoose.connect("mongodb+srv://nikhil_bagal14:Nik1402@cluste-1.3xk6z.mongodb.net/mean-project")
.then(() => {
  console.log('Connected to Database');
})
.catch(() => {
  console.log('Connection failed');
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST , PATCH, PUT , DELETE, OPTIONS"
  );
  next();
});

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}))

app.use("/api/posts/",postRoutes);
module.exports = app;