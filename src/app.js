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
      users.insertOne(user, function(err, result) {
          if(err){
              console.log("Write Failed")
          }
          else console.log("Write Succeed")
      });

    //Fetching all the documents from collection and converting to an array
      users.find().toArray(function(err, firstUsers) {
          if (err){
              console.log("An error occurred in query")
          }
          else{
              console.log("Query succeed")
              //Using the documents in the array
              console.log("Query succeed")
              //You can manipulate this array as you wa for example
                  //View the whole array
                  console.log("firstUser")

              console.log("ObjectID =" +firstUsers[0]._id)
              console.log("Username = " +firstUsers[0].username)
              console.log("Address = "+ firstUsers[0].address)
              console.log("LoginStatus = "+ firstUsers[0].loginStatus)
              console.log("Emails = "+firstUsers[0].email[0] +" and " +firstUsers[0].email[1])
          }

      })


      db.close();

  }
  else {
    console.log("Not Connected")
      console.log("Check that Mongodb is running on port 27017")
  }
});


