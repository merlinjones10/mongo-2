const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(express.json());
//ROUTES in /posts
const postsRoute = require('./routes/posts');
// Middleware for posts, everytime /posts is hit this runs
app.use(cors());
app.use('/posts', postsRoute);
// Home Route
app.get('/', (req, res) => {
  res.send('Home page');
});
//MONGOOSE
mongoose.connect(process.env.MONGO_URI, () => {
  console.log('connected to DB!');
});
app.listen(3000);

//
//app.get -> gets info fro, db
//app.post -> gives info to db
//app.delete
//Middleware, executes when a route is hit:
//app.use() then a call back
// app.use('/posts', () => {
//   console.log('This is a middleware only running on /posts route');

// });
