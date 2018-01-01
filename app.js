 var express = require("express");
 app = express(),
 bodyParser = require("body-parser"),
 expressSanitizer = require("express-sanitizer"),
 methodOverride = require("method-override"),
 mongoose = require('mongoose');
 mongoose.connect("mongodb://localhost/restful_blog_app");
 app.set("view engine", "ejs");
 app.use(express.static("public"));
 app.use(bodyParser.urlencoded({extended:true}));
 app.use(expressSanitizer());
 app.use(methodOverride("_method"));

// APP / CONFIG
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type:Date, default: Date.now}
});

// MONGOOSE / MODEL / CONFIG
var Blog = mongoose.model("Blog", blogSchema);

 //   Blog.create({
 // 	title : "Test Blog ", 
 // 	image : "http://www.technocrazed.com/wp-content/uploads/2015/12/beautiful-wallpaper-download-14.jpg",
 // 	body : "Hello this is test blog"
 // }, function(err,campground) {
 // 	if(err){
 // 		console.log(err);
 // 	}
 // 	else{
 // 		console.log(campground);
 // 	}
 // });

// RESTFUL ROUTES

app.get('/',function (req,res) {
	res.redirect("/blogs");
});

// INDEX ROUTE
app.get('/blogs',function (req,res) {
	Blog.find({},function(err,allBlogs) {
		if(err){
			console.log(err);
		}
		else{
			res.render("index",{blogs:allBlogs});
		}
	});
});


// NEW ROUTE 
app.get('/blogs/new',function (req,res) {
	res.render("new");
});


// CREATE ROUTE 
app.post('/blogs',function (req,res) {
 	// CREATE NEW BLOG AND SAVE TO DB
 	req.body.blog.body = req.sanitize(req.body.blog.body);
 	Blog.create(req.body.blog,function (err, newBlog) {
 		if(err){
 			console.log(err);
 		}
 		else{
 			// REDIRECT BACK TO BLOGS INDEX PAGE
 			res.redirect("/blogs");
 		}
 	});
 	
 });

// SHOW ROUTE 
app.get('/blogs/:id',function (req,res) {
 	// FIND BLOG WITH PROVIDED ID
 	Blog.findById(req.params.id,function (err,foundBlog) {
 		if(err){ 
 			res.redirect("/blogs");
 		}
 		else{
 			// RENDER SHOW TEMPLATE OF THAT BlOG
 			res.render("show", {blog : foundBlog});
 		}
 	});
 	
 });


// EDIT ROUTE 
app.get('/blogs/:id/edit',function (req,res) {
 	// FIND BLOG WITH PROVIDED ID
 	Blog.findById(req.params.id,function (err,foundBlog) {
 		if(err){ 
 			res.redirect("/blogs");
 		}
 		else{
 			// RENDER EDIT TEMPLATE OF THAT BlOG
 			res.render("edit", {blog : foundBlog});
 		}
 	});
 	
 });

 // UPDATE ROUTE 
 app.put('/blogs/:id',function (req,res) {
 	// FIND BLOG WITH PROVIDED ID
 	req.body.blog.body = req.sanitize(req.body.blog.body);
 	Blog.findByIdAndUpdate(req.params.id,req.body.blog,function (err,updateddBlog) {
 		if(err){ 
 			res.redirect("/blogs");
 		}
 		else{
 			// REDIRECT TO updated TEMPLATE OF THAT BlOG
 			res.redirect("/blogs/"+req.params.id);
 		}
 	});
 	
 });


 // DELETE ROUTE 
 app.delete('/blogs/:id',function (req,res) {
 	// FIND BLOG WITH PROVIDED ID
 	Blog.findByIdAndRemove(req.params.id,function (err,updateddBlog) {
 		if(err){ 
 			res.redirect("/blogs");
 		}
 		else{
 			res.redirect("/blogs");
 		}
 	});
 	
 });

 app.listen(3000,function() {
 	console.log("app started !!!");
 });