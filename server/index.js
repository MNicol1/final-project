const express = require('express');
const { postUsers, postStationLiked, getLikedStations, getUser} = require("./handlers")
const app = express();

app.use(express.json())
app.use(express.static("public"))

// List of endpoints here : 


app.post("/post-users", postUsers)

app.post("/post-liked-stations", postStationLiked)
app.get("/get-liked-stations", getLikedStations)
app.get("/get-user/:email", getUser)



// app.patch("/add-like", postLike )



// Basic initial setup 
app.get('/', (req, res) => {
   res.send('Hello World');
})



// This is a catch all endpoint

app.get("*", (req, res) => {
   res.status(404).json({
     status: 404,
     message: "This is obviously not what you are looking for.",
   });
 });

app.listen(8000, () => console.log("Listening on port 8000"));


// GUIDELINES 

// get a user - usually by id  but just email is fine.  
// get all likes -> on load, people on home page can see likes a given staion / see most liked stations
// post a like (posts a like from a user)
// patch (removes a like from a user)

// get a station by id
// get a list of station ids

// plus some auth0 end points

// collection of likes and example of a like object:

// {
//      id : of the radio station,
//      like-list: [
//              {userEmail : }
//      ]
// }

