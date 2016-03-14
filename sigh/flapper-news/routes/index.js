var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

//needs on top
var mongoose = require('mongoose');
var Post = mongoose.model('Post');         
var Comment = mongoose.model('Comment');   

// Get all posts
router.get('/posts', function(req, res, next) {
	Post.find(function(err, posts) {
		if (err) { return next(err); }
		
		res.json(posts);
	});
});

// Create new post
router.post('/posts', function(req, res, next) {
	var post = new Post(req.body);
	
	post.save(function(err, post) {
		if(err) { return next(err); }
		
		res.json(post);
	});
});

// Express's param() function to automatically load an object.
router.param('post', function(req, res, next, id) {
	var query = Post.findById(id);
	
	query.exec(function (err, post) {
		if (err) { return next(err); }
		if (!post) { return next(new Error("can't find post")); }
		
		req.post = post;
		return next();
	});
});

// page 7 recreating router.param for comments
router.param('comment', function (req, res, next, id) {
	var query = Comment.findById(id);
	
	query.exec(function (err, comment) {
		if (err) { return next(err); }
		if (!comment) { return next(new Error("can't find comment")); }
		
		req.comment = comment;
		return next();
	});
});

// Get single post
router.get('/posts/:post', function(req, res, next) {
  req.post.populate('comments', function(err, post) {
    if (err) { return next(err); }

    res.json(post);
  });
});

// Upvote post
router.put('/posts/:post/upvote', function(req, res, next) {
	req.post.upvote(function(err, post) {
		if (err) { return next(err); }
		
		res.json(post);
	});
});
// Upvote comment
router.put('/posts/:post/comments/:comment/upvote', function (req, res, next) {
	req.comment.upvote(function (err, comment) {
		if (err) {
			return next(err);
		}
		
		res.json(comment);
	});
});
// Post comment
router.post('/posts/:post/comments', function(req, res, next) {
	var comment = new Comment(req.body);
	comment.post = req.post;
	comment.save(function(err, comment) {
		if (err) { return next(err); }
		
		req.post.comments.push(comment);
		req.post.save(function(err, post) {
			if (err) { return next(err); }
			
			res.json(comment);
		});
	});
});

module.exports = router;