const express = require('express');
const { postUsers, postStationLiked, getLikedStations, getUser, removeLikeFromStation} = require("./handlers")
const app = express();

app.use(express.json())
app.use(express.static("public"))

// List of endpoints here : 

// user endpoints 
app.post("/post-users", postUsers)
app.get("/get-user/:email", getUser)
// TODO: add update user endpoint
// TODO: add delete user endpoint

// station endpoints 
// Add a like to a station, if the station doesn't exist in the likedStation collection, add it in there
app.post("/post-liked-stations", postStationLiked)

app.put("/remove-like-from-station/:stationId", removeLikeFromStation)

// Get all liked stations
app.get("/get-liked-stations", getLikedStations)



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


//  getall liked stations -  What's wrong with my code ?? 
//  Does postLikeStations work ?? need to be adapted to have user like it ?? 
//      Need to coonect a user to the likedstations collection
// why is 

