// const express = require('express');
// const { postUsers, postStationLiked, getLikedStations} = require("./handlers");

// const app = express();

// app.use(express.json())
// app.use(express.static("public"))


// // List of endpoints here : 

// // USER endpoints 
// // post user
// app.post("/post-users", postUsers)

// // STATION endpoints 
// // Add station likes, updates and validates
// app.post("/post-liked-stations", postStationLiked)
// // Get liked stations / likes.
// app.get("/get-liked-stations/:id", getLikedStations)






// // Basic initial setup 
// app.get('/', (req, res) => {
//    res.send('Hello World');
// })

// // This is a catch all endpoint

// app.get("*", (req, res) => {
//    res.status(404).json({
//      status: 404,
//      message: "This is obviously not what you are looking for.",
//    });
//  });

// app.listen(8000, () => console.log("Listening on port 8000"));


