const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const Post = require('./Gonder/post');
const methodOverride = require('method-override');
const postController = require('./controllers/postController');


const app = express();
mongoose.connect('mongodb://localhost/cleanblog-test-db');
//Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
//Template Engine
app.set('view engine', 'ejs');

//Router
app.get('/',postController.getPost );
app.get('/posts/:id',postController.getOnePost );

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
  await Post.create(req.body);
  res.redirect('/');
});
app.get('/post/edit/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);

  res.render('edit', {
    post,
  });
});

app.put('/post/:id', async (req, res) => {
  const { title, detail } = req.body;
  await Post.findByIdAndUpdate(req.params.id, {
    title,
    detail,
  });
  res.redirect('/');
});

app.delete('/post/:id', async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

const port = 3000;
app.listen(port, () => {
  console.log('sunucu başladı');
});
