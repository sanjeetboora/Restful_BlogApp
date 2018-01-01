 var express = require("express");
 var app = express();
 var bodyParser = require("body-parser");
 var mongoose = require('mongoose');
 mongoose.connect("mongodb://localhost/restful_blog_app");
 app.set("view engine", "ejs");
 app.use(express.static("public"));
 app.use(bodyParser.urlencoded({extended:true}));

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



 app.listen(3000,function() {
 	console.log("app started !!!");
 });