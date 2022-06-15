const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Local Utility Functions
const { isLikedByUser } = require("./utils/validateIsLikedByUser");
const { getUserFromDb } = require("./utils/getUserFromDb");

//Handlers



// GET ALL LIKED STATIONS

// to render the number of likes ?




const getLikedStations = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    const station = { stationId: req.params.id };
    
  
    await client.connect();

    const db = client.db("db-name");

    const stations = await db.collection("likedStations").findOne(station);

    if (stations) {
      res
        .status(200)
        .json({ status: 200, stations, message: "liked stations" });
    } else {
      res
        .status(204)
        .json({ status: 404, message: "can't find liked stations" });
    }

    

  } catch (err) {
    res
    .status(204)
    .json({ status: 400, message: "error finding stations" });
  
    console.log(err.stack);
  }

  client.close();

};



// POST STATION  : OK

const postStationLiked = async (req, res) => {
  // console.log("test error");

  const { id, email } = req.body;

  const client = new MongoClient(MONGO_URI, options);
  let numberOfLikes = 0;
  try {
    await client.connect();
    const db = client.db("db-name");
    const likedStation = await db
      .collection("likedStations")
      .findOne({ stationId: id });
console.log(likedStation);


    const userFromDb = await getUserFromDb({
      db,
      collection: "appUsers",
      email,
    });

    const isLiked = await isLikedByUser({
      userFromDb,
      id,
    });

    if (isLiked) {
      return res.status(400).json({
        status: 400,
        message: "Station already liked by this user.",
        error: true,
      });
    } else if (likedStation) {
      numberOfLikes = likedStation.numLikes;
      const userList = [...likedStation.users, email];
     

      // Update user to include stationId in likedStation array
      // stretch goal only 
      userFromDb.likedStations.push(id);
      const userQueryObj = { email};
     
      const updateUserObj = { $set: { ...userFromDb } };
      await db.collection("appUsers").updateOne(userQueryObj, updateUserObj);



      // Update station's number of likes and array of liked users
      const updatedLikes = {
        $set: { numLikes: numberOfLikes + 1, users: userList },
      };
      // const updatedUserList = { $set: { users: userList } };
      await db
        .collection("likedStations")
        .updateOne({ stationId: id }, updatedLikes);
      // await db
      //   .collection("likedStations")
      //   .updateOne({ stationId: id }, updatedUserList);
    } else {
      userFromDb.likedStations.push(id);
      const updateUserObj = { $set: { ...userFromDb } };
      const userQueryObj = { email};
      await db.collection("appUsers").updateOne(userQueryObj, updateUserObj);

      await db
        .collection("likedStations")
        .insertOne({ stationId: id, numLikes: 1, users: [email] });
    }
    res.status(200).json({ status: 200, message: "station liked", numLikes: numberOfLikes + 1 });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: 400, message: "couldn't like station" });
  }

  client.close();
};





// POST USER  : OK 

const postUsers = async (req, res) => {
  try {
    const client = await new MongoClient(MONGO_URI, options);

    // const likedStations = {likedStations : []}

    await client.connect();
    const db = client.db("db-name");
    const exsistingUser = await db
      .collection("appUsers")
      .findOne({ email: req.body.email });
    if (!exsistingUser) {
      await db.collection("appUsers").insertOne({...req.body, likedStations: []});
    }

    res.status(200).json({ status: 200, message: "user added to database" });
  } catch (error) {
    res
      .status(400)
      .json({ status: 400, message: "couldn't add user to database" });
  }
};

//  REMOVE A like from station



const removeLikeFromStation = async (req, res) => {

  const client = new MongoClient(MONGO_URI, options);

  try {
    const likeNum = { id: req.params.id };

    await client.connect();
    const db = client.db("db-name");

    const result = await db.collection("likedStations").findOneAndDelete({ stationId: id, numLikes: 1 });

    result
      ? res.status(200).json({ status: 200, data: result })
      : res.status(404).json({ status: 404, message: "Not Found" });
  } catch (err) {
    console.log(err.stack);
  }
  client.close();
};


//HANDLERS NOT BEING USED 




// getNumOfLikes - NOT being used 

const getNumOfLikes = async (req,res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("db-name");

    const numLikes = await db
      .collection("likedStations")
      .findOne()
      .toArray();
    res.status(200).json({ status: 200, data: numLikes });

    client.close();
  } catch (err) {
    console.log(err);
  }

}



// GET USER Not being used :

const getUser = async (req, res) => {
  const email = req.params.email;

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("db-name");
    const user = await db.collection("appUsers").findOne({ email: email });

    if (user) {
      return res
        .status(200)
        .json({ status: 200, message: "hello user found", data: user });
    } else {
      return res.status(400).json({ status: 400, message: "user not found" });
    }
  } catch (err) {
    console.log(err);
  }
};


// Get Favorites - likes 


// const getLikes = async (req,res) => {
//   try {
//     const client = new MongoClient(MONGO_URI, options);
//     await client.connect();
//     const db = client.db("db-name");
//     const userLikes = await db
//       .collection("appUsers")
//       .find()
//       .toArray();
//     res.status(200).json({ status: 200, data: userLikes });

//     client.close();
//   } catch (err) {
//     console.log(err);
//   }

// }





// POST LIKE :

// const postLike = async (req, res) => {
//   try {
//     const { id, email } = req.body;
//     // console.log(req.body)
//     const client = new MongoClient(MONGO_URI, options);
//     await client.connect();
//     const db = client.db("db-name");

//     const findUser = await db.collection("appUsers").findOne({ email });
//     console.log(findUser);

//     const updateUser = await db
//       .collection("appUsers")
//       .updateOne({ email: email }, { $set: { favourites: id } });
//     await client.close();
//     if (updateUser) {
//       return res
//         .status(200)
//         .json({ status: 200, message: "success", data: updateUser });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({ status: 500, mesage: "error", error: err });
//   }
// };

module.exports = {
  postUsers,
  postStationLiked,
  removeLikeFromStation,
  getUser,
  getNumOfLikes,
  getLikedStations
};
