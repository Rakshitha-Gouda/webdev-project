let express = require('express');
let app = express();
app.use(express.json());
let port = process.env.PORT || 3002;
const users = [
  {
  "id" : 1,
  "name" : "Nevaeh Roberts ",
  "gender": "Female",
  "image": "https://randomuser.me/api/portraits/women/52.jpg"
  },

  {
  "id" : 2,
  "name" : "Mackenzie Jackson",
  "gender": "Female",
  "image": "https://randomuser.me/api/portraits/women/26.jpg"
  },
  {
  "id" : 3,
  "name" : "Peppi Korpi",
  "gender": "Female",
  "image": "https://randomuser.me/api/portraits/women/67.jpg"
  },
  {
  "id" : 4,
  "name" : "Alexandra Shaw",
  "gender": "Female",
  "image": "https://randomuser.me/api/portraits/women/95.jpg"
  },
  {
  "id" : 5,
  "name" : "Ramberto Vieira",
  "gender": "Male",
  "image": "https://randomuser.me/api/portraits/men/90.jpg"
  }
]


app.use(express.static("frontend"));

app.get("/api/users", function(req, res) 
{
  res.status(200).json(users);
})

function getUserById(uid)
{
  for(var i=0;i<users.length;i++)
  {
    if(uid == users[i].id)
      return i;
  }
  return -1;
}

//get user by id
app.get("/api/users/:id", function(req, res) 
{
  var uid=req.params.id;
  var userid = getUserById(uid);

  if(userid==-1)
  {
    res.status(404).json({"message":"User not found"});
  }
  res.status(200).json(users[userid])
})

//get random user
app.get("/api/randomuser",function(req,res)
{
  var n=users.length;
  const randomid=Math.floor(Math.random()*n);
  res.status(200).json(users[randomid])
})

var newuserid=users.length+1;
//add a new  user

app.post("/api/users", function(req, res)
{ if(!req.body.name || !req.body.gender || !req.body.image)
    res.status(400).json({"message":"Please provide name, gender and image"});
  var newuser=req.body;
  newuser.id = newuserid;
  newuserid++;
  users.push(newuser);
  res.status(201).json({"message":"User added successfully"});
})

//put: update user details of given id
app.put("/api/users/:id", function(req, res)
{
  var userid=getUserById(req.params.id);
  if(userid==-1)
    return res.json({"message":"User not found"});
    if(req.body.name)
      users[userid].name=req.body.name;
    if(req.body.gender)
      users[userid].gender=req.body.gender;
    if(req.body.image)
      users[userid].image=req.body.image;

    return res.status(200).json({"message":"User updated successfully","user":users[userid]});
})

app.delete("/api/users/:id", function(req, res)
{
  var userid=getUserById(req.params.id);
  if(userid==-1)
    return res.json({"message":"User not found"});
  users.splice(userid,1);
  return res.status(200).json({"message":"User deleted successfully"});
})

app.listen(port, function() {
  console.log(`Server is running on http://localhost:${port}`);
});