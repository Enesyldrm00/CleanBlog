const Post = require('../Gonder/post');

exports.getPost = async (req, res) => {
  const posts = await Post.find({});
  res.render('index', {
    posts,
  });
}
exports.getOnePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('post', {
    post,
  });
};