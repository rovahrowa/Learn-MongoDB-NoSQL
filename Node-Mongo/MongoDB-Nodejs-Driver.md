Mongo DB has rapidly grown to become a popular database for web applications and is a perfect fit for Node.JS applications, letting you write Javascript for the client, backend and database layer. Its schemaless nature is a better match to our constantly evolving data structures in web applications, and the integrated support for location queries is a bonus that’s hard to ignore. Throw in Replica Sets for scaling, and we’re looking at really nice platform to grow your storage needs now and in the future.

Now to shamelessly plug my driver. It can be downloaded via npm, or fetched from the github repository. To install via npm, do the following:

npm install mongodb

or go fetch it from github at https://github.com/mongodb/node-mongodb-native

Once this business is taken care of, let’s move through the types available for the driver and then how to connect to your Mongo DB instance before facing the usage of some CRUD operations.

Mongo DB data types
So there is an important thing to keep in mind when working with Mongo DB, and that is the slight mapping difference between types Mongo DB supports and native Javascript data types. Let’s have a look at the types supported out of the box and then how types are promoted by the driver to fit as close to native Javascript types as possible.


```
Datatypes
-Float is a 8 byte and is directly convertible to the Javascript type Number
-Double class a special class representing a float value, this is especially useful when using capped collections where you need to ensure your values are always floats.
-Integers is a bit trickier due to the fact that Javascript represents all Numbers as 64 bit floats meaning that the maximum integer value is at a 53 bit. Mongo has two types for integers, a 32 bit and a 64 bit. The driver will try to fit the value into 32 bits if it can and promote it to 64 bits if it has to. Similarly it will deserialize attempting to fit it into 53 bits if it can. If it cannot it will return an instance of Long to avoid losing precision.
-Long class a special class that lets you store 64 bit integers and also lets you operate on the 64 bit integers.
-Date maps directly to a Javascript Date
-RegExp maps directly to a Javascript RegExp
-String maps directly to a Javascript String (encoded in utf8)
-Binary class a special class that lets you store data in Mongo DB
-Code class a special class that lets you store javascript functions in Mongo DB, can also provide a scope to run the method in
-ObjectID class a special class that holds a MongoDB document identifier (the equivalent to a Primary key)
-DbRef class a special class that lets you include a reference in a document pointing to another object
-Symbol class a special class that lets you specify a symbol, not really relevant for javascript but for languages that supports the concept of symbols.

```

As we see the number type can be a little tricky due to the way integers are implemented in Javascript. The latest driver will do correct conversion up to 53 bits of complexity. If you need to handle big integers the recommendation is to use the Long class to operate on the numbers.
Getting that connection to the database
Let’s get around to setting up a connection with the Mongo DB database. Jumping straight into the code let’s do direct connection and then look at the code.


```
// Retrieve
let MongoClient =require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/Learn-Mongo", function(err, db) {
  if(!err) {
    console.log("Connected");
  }
  else {
    console.log("Not Connected")
      console.log("Check that Mongodb is running on port 27017")
  }
});
```


Let’s have a quick look at how the connection code works. The Db.connect method let’s use use a uri to connect to the Mongo database, where localhost:27017 is the server host and port and exampleDb the db we wish to connect to. After the url notice the hash containing the auto_reconnect key. Auto reconnect tells the driver to retry sending a command to the server if there is a failure during its execution.

Another useful option you can pass in is

poolSize, this allows you to control how many tcp connections are opened in parallel. The default value for this is 5 but you can set it as high as you want. The driver will use a round-robin strategy to dispatch and read from the tcp connection.

We are up and running with a connection to the database. Let’s move on and look at what collections are and how they work.

This code will connect to the db, create a collection abject and add a document to that collection

```

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
      users.insertOne(user, {w:1}, function(err, result) {});

  }
  else {
    console.log("Not Connected")
    console.log("Check that Mongodb is running on port 27017")
  }
});

```

For smaller crud operations, you can do this

```
// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
  if(err) { return console.dir(err); }

  db.collection('test', function(err, collection) {});

  db.collection('test', {w:1}, function(err, collection) {});

  db.createCollection('test', function(err, collection) {});

  db.createCollection('test', {w:1}, function(err, collection) {});

});

```


Time to Query
Queries is of course a fundamental part of interacting with a database and Mongo DB is no exception. Fortunately for us it has a rich query interface with cursors and close to SQL concepts for slicing and dicing your datasets. To build queries we have lots of operators to choose from Mongo DB advanced queries. There are literarily tons of ways to search and ways to limit the query. Let’s look at some simple code for dealing with queries in different ways.

the requires and and other initializing stuff omitted for brevity

```

//Fetching all the documents from collection and converting to an array
      users.find().toArray(function(err, firstUsers) {
          if (err){
              console.log("An error occurred in query")
          }
          else{
              console.log("Query succeed")
              //Using the documents in the array
              console.log("Query succeed")
              console.log("ObjectID =" +firstUsers[0]._id)
              console.log("Username = " +firstUsers[0].username)
              console.log("Address = "+ firstUsers[0].address)
              console.log("LoginStatus = "+ firstUsers[0].loginStatus)
              console.log("Emails = "+firstUsers[0].email[0] +" and " +firstUsers[0].email[1])
          }

      })

```
You can manipulate this array as you want

for example

