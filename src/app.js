// Retrieve
//let MongoClient =require('mongodb').MongoClient;
import MongoClient from 'mongodb'
// Connect to the db
MongoClient.connect("mongodb://localhost:27017/Learn-Mongo", function(err, db) {
  if(!err) {
    console.log("Connected");
    //Create collection object users
    let users = db.collection('users')
      //Create user object to store data for a user

      let user ={
                      id:users.find().count(),
                      username:"danstan",
                      name : "Danstan Otieno Onyango",
                      email : [
                          "danstan@domain.com",
                          "danstan@domain.com"
                      ],
                      phone: 728554638,
                      address: "24 Street Nairobi",
                      age : 23,
                      accountType : "admin",
                      favourites : {
                          oss :[
                              "Linux",
                              "MacOsX"
                          ],
                          languages : ["JavaScript", "Java"],
                          databases : ["MongoDB","PostqreSQL"]
                      },
                      loginStatus: true
      }


      //Insert user document to users collection
      users.insert(user, {w:1}, function(err, result) {});

  }
  else {
    console.log("Not Connected")
      console.log("Check that Mongodb is running on port 27017")
  }
});
