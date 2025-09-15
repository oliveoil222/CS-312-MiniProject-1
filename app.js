const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;

//establish middleware 
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json());

//array for storage
let posts = [];
//post id counter
let postId = 1;

//display posts
app.get('/', (req, res) => {
  res.render('index', { posts }); 
});

//page to create a new post
app.get('/post', (req, res) => {
  res.render('post', { post: null }); 
});

//submission
app.post('/post', (req, res) => {
  const { id, title, content, category } = req.body;
  //if the post exists
  if (id) {
    //update it
    const post = posts.find(p => p.id === parseInt(id));
    if (post) {
      post.title = title;
      post.content = content;
      post.category = category;
    }
  } else {
    //otherwise, create a new post
    posts.push({ id: postId++, title, content, category });
  }

  res.redirect('/'); 
});

//deletion
app.post('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  posts = posts.filter(post => post.id !== id);
  res.redirect('/'); 
});

//update
app.get('/post/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);
  if (!post) return res.redirect('/');
  res.render('post', { post }); // pass post to pre-fill form
});

//start server console log
app.listen(port, () => {
  console.log(`Blog app is listening at http://localhost:${port}`);
});



