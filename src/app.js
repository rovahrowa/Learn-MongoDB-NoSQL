// Retrieve
var MongoClient =require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/Learn-Mongo", function(err, db) {
  if(!err) {
    console.log("Connected");
  }
  else console.log("Not Connected")
});
