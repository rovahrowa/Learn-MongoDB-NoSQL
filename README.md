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