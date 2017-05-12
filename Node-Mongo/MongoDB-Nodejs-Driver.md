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


