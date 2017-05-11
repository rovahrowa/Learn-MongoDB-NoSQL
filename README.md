# Learn-MongoDB-NoSQL

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