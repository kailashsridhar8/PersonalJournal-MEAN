const express = require('express');
const bodyParser = require('body-parser');
const app = express();  //return app
const mongoose = require('mongoose');

const Post = require('./models/post');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


mongoose.connect("mongodb+srv://user:TV781Q2Km14Trr9z@cluster0.6xplf.mongodb.net/Node_Angular?retryWrites=true&w=majority")
.then(() => {
  console.log("Connected Succesfully");
})
.catch(() => {
  console.log("Error Connecting");
});

app.use((req,res,next) =>{
  res.setHeader("Access-Control-Allow-Origin", "*"); //to accept req from multiple domains
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-Width, Content-Type, Accept");//postdata secure& authorization
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"  //allowed methods
  );
  next();
});
app.post("/api/posts", (req ,res ,next) =>{
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
post.save().then(createdPost =>{
  res.status(201).json({
    message: 'Post added succesfully',
    postId: createdPost._id
  });
});

});

app.get('/api/posts',(req,res,next) => {
  Post.find()
  .then(document => {

    res.status(200).json({
      message : 'post fetched succesfully',
      posts : document
    });

  });

});

app.delete('/api/posts/:id',(req,res,next)=>{
 Post.deleteOne({_id: req.params.id}).then(result => {
   console.log(result);
   res.status(200).json({
    message: "Post Deleted"
  });
 })

})

module.exports = app;


