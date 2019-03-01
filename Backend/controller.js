const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Movie = require("./movies");
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static(__dirname + "/client"));
app.use(bodyParser.json());

Genre = require("./genres");

// Connect to Mongoose
mongoose.connect("mongodb://localhost/movieDB", { useNewUrlParser: true });
var db = mongoose.connection;

app.get("/", (req, res) => {
  res.send("Please use /api/books or /api/genres");
});

app.get("/api/genres", (req, res) => {
  Genre.getGenres(10, function(err, result) {
    if (!err) res.status(200).json({ sucess: result });
    else res.status(400).json({ error: "Not able to get Values" });
  });
});

app.get("/api/movies", (req, res) => {
  Movie.getMovies(100, function(err, result) {
    if (!err) res.status(200).json({ sucess: result });
    else res.status(400).json({ error: "Not able to get Values" });
  });
});


app.delete("/api/movie/delete/:id", (req, res) => {
  Movie.deleteMovie(req.params.id, function(type) {
    if (type === "success")
      res.status(200).json({ success: "Movie deleted Successfully" });
    else res.status(400).json({ error: "Movie not present in the database" });
  });
});

//adding new movie
app.post("/api/movie/insert",(req,res) =>{
  Movie.insertMovie(req.body.title,req.body.numberInStock,req.body.dailyRentalRate,
    req.body.genreId,req.body.genreName,function(type){
      if(type==="Success")
        res.status(200).json({success:"Movie Added Successfully"});
        else
        res.status(400).json({error:"Unable to Insert Values"});
    })
})

//Editing old movie
app.put("/api/movie/:id",(req,res) =>{
  Movie.editMovie(req.params.id,req.body.title,req.body.numberInStock,req.body.dailyRentalRate,
    req.body.genreId,function(type){
      if(type==="Success")
        res.status(200).json({success:"Movie Edited Successfully"});
        else
        res.status(400).json({error:"Unable to Insert Values"});
    })
})

//getting a single movie
app.get("/api/movie/:id",(req,res)=>{
  Movie.getMovie(req.params.id,function(err,result){
    if(!err) res.status(200).json({success:result});
    else
    res.status(400).json({error:"Not able to fetch data"});
  })
})

app.listen(3900);
console.log("Running on port 3900...");
