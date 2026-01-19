const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const Post = require('./Gonder/post');

const app = express();
mongoose.connect('mongodb://localhost/cleanblog-test-db');
//Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Template Engine
app.set('view engine', 'ejs');

//Router
app.get('/', async (req, res) => {
  const posts = await Post.find({});
  res.render('index', {
    posts,
  });
});
app.get('/post', (req, res) => {
  res.render('post');
});
app.get('/add_post', (req, res) => {
  res.render('add_post');
});

app.get('/about', (req, res) => {
  res.render('about');
});
app.post('/add_post', async (req, res) => {
   console.log(req.body);   
  await Post.create(req.body);
  res.redirect('/');
});
const port = 3000;
app.listen(port, () => {
  console.log('sunucu başladı');
});
