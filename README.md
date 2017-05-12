# Learn-MongoDB-NoSQL

#Introduction

A Basic introduction to Mongo DB
Mongo DB has rapidly grown to become a popular database for web applications and is a perfect fit for Node.JS applications, letting you write Javascript for the client, backend and database layer. Its schemaless nature is a better match to our constantly evolving data structures in web applications, and the integrated support for location queries is a bonus that’s hard to ignore. Throw in Replica Sets for scaling, and we’re looking at really nice platform to grow your storage needs now and in the future.

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

#MongoDB Client.

#Connecting to mongodb from shell client--Default db is test

```
mongo

```
#Show databases

```
show dbs

```
#Connect to a database-Dtabases are ony saved or stored untill some data is stored in it

```
use dbdname

```
#creating new db-Until data is stored in it, the new db is not saved

```
use newdbname

```
#show current database

```
db

```


#Create new collections in shell

```
db.users

```
#Insert data in shell-Just define the json-You can use arrays

```

db.users.insert(
{
    username:"Fredrick Menty Oluoch", 
    age:"27", address:"24 street nairobi", 
    accountType:"admin", 
    email:["danstan@domain.com","onyango@domain.com","otieno@domain.com"],
    dateCreated:new Date()
 
});

```

#Insert data by building javascript objects and parsing the object to the insert function

```
var user ={}
user.username="danstan",
user.username="Danstan Otieno Onyango"
user.email=["danstan@domain.com","danstan@domain.com"]
user.age=23
user.accountType="admin"
//Create another object within the user object
user.favourites={}
user.favourites.os="Linux"
user.favourites.language="JavaScript"
user.favourites.database="MongoDB"
user.dateCreated=new Date()
db.users.save(user)

```

#Show the new object

```
user

```

#show all documents(SQL ROWS) in currect collection(SQL TABLE)

```
db.users.find()

```

#Show a nice json of all the documents in the current collection

```
db.users.find().forEach(printjson)

```

#Lets talk about objectId field: Its created for each document and is unique. Its generated based on the 
1. The time the document was created,
2. The hostname of the server running the mongo instance,
3. The process ID of the Mongo instance that created the document

From this object we can get infomation that relates to the document.
1. Time 
2. Date

For exmaple

#Lets get the _id from the first document in the collection

```

db.users.find()[0]._id

```
#getTimestamp from the object

```
db.users.find(0)[0]._id.getTimestamp()

```

#Creating new objectId

```
new ObjectId

```

#BUT
Since this objectId is a longer complicated string to use on a url, it is good to use an indexed filed that i unique to a each document.
To do this an example os to use the document counter to that filed

```
function counter(username){
	var ret = db.counters.findAndModify({query:{id:username}, update:{$inc : {next:1}}, "new":true, upsert:true});
	return ret.next;

}
```

```

db.users.insert(
{
    id:counter,
    name:"Fredrick Menty Oluoch",
    username:"fred",
    age:"27", address:"24 street nairobi",
    accountType:"admin",
    email:["danstan@domain.com","onyango@domain.com","otieno@domain.com"],
    dateCreated:new Date()

});

```


#OR-Not Tested Well use db.doc.count()

```
db.users.insert(
{
    id:db.users.count(),
    name:"Fredrick Menty Oluoch",
    username:"fred",
    age:"27", address:"24 street nairobi",
    accountType:"admin",
    email:["danstan@domain.com","onyango@domain.com","otieno@domain.com"],
    dateCreated:new Date()

});

```

```
db.users.save({
	id:db.users.count(),
	username : "Danstan Otieno Onyango",
	email : [
		"danstan@domain.com",
		"danstan@domain.com"
	],
	phone: 0728554638,
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
	loginStatus: true,
})
```

As you can see, You can nest objects and arrays in the database as much as you want

#Foreign Keys

Not used here in NoSQL
A join would be time consuming when using a large cluster of servers
Since we cant use joins and foreign keys as we use them on Relational Databases,
We have to rethink how to normalize the db in NoSQL

Lets do a manual way of doing foeign keys in Mongo

Create accounts collection
The username filed appears in both documents it can also just be passed for getting the account id from the accounts document where the username is the document username here in users document.


```
db.accounts.insert(
{	
	id: db.accounts.count(),
    	username:"dan",
    	email:["danstan@domain.com","onyango@domain.com","otieno@domain.com"]
});

```

```
db.users.save({
        id:db.users.count(),
        accountId: db.accounts.findOne({username:"dan"}).id,
        username : "dan",
        email : [
                "danstan@domain.com",
                "danstan@domain.com"
        ],
        phone: 0728554638,
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
})

```

```

db.users.save({
	id:db.users.count(),
	username : "Danstan Otieno Onyango",
	email : [
		"danstan@domain.com",
		"danstan@domain.com"
	],
	phone: 0728554638,
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
})
```

As you can see, You can nest objects and arrays in the database as much as you want

Foreign Keys

Not used here in NoSQL
A join would be time consuming when using a large cluster of servers
Since we cant use joins and foreign keys as we use them on Relational Databases,
We have to rethink how to normalize the db in NoSQL

Lets do a manual way of doing foeign keys in Mongo

Create accounts collection
The username filed appears in both documents it can also just be passed for getting the account id from the accounts document where the username is the document username here in users document.

```
db.accounts.insert(
{	
	id: db.accounts.count(),
    	username:"dan",
    	email:["danstan@domain.com","onyango@domain.com","otieno@domain.com"]
});

```

```
db.users.save({
        id:db.users.count(),
        accountId: db.accounts.findOne({username:"dan"}).id,
        username : "dan",
        email : [
                "danstan@domain.com",
                "danstan@domain.com"
        ],
        phone: 0728554638,
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
})
```

#RECAP
#Create an object and parse to the insert function to write to db

```

> show dbs
Learn-Mongo  0.000GB
admin        0.000GB
local        0.000GB
> use Learn-mongo
switched to db Learn-mongo
> currency={}
{ }
> currency.name="Kesha Shillings"
Kesha Shillings
> currency.symbol="KSH"
KSH
> currency.rates={}
{ }
> currency.rates.UGSH=35.5467
35.5467
> currency.rates.USD=112.2342
112.2342
> currency.rates.TZS=44.8934
44.8934
> currency.unit=1
1
> currency
{
    "name" : "Kesha Shillings",
    "symbol" : "KSH",
    "rates" : {
        "UGSH" : 35.5467,
        "USD" : 112.2342,
        "TZS" : 44.8934
    },
    "unit" : 1
}
> currency.country="Kenya"
Kenya
> currency
{
    "name" : "Kesha Shillings",
    "symbol" : "KSH",
    "rates" : {
        "UGSH" : 35.5467,
        "USD" : 112.2342,
        "TZS" : 44.8934
    },
    "unit" : 1,
    "country" : "Kenya"
}
> db.currency.insert(currency)
WriteResult({ "nInserted" : 1 })

```

