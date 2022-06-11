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

// to render the number of likes ...

const getLikedStations = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    const station = req.params.id;
    await client.connect();

    const db = client.db("db-name");

    const stations = await db.collection("likedStations").find().toArray();
    // toArray():  ??

    // console.log(users);

    if (stations) {
      res
        .status(200)
        .json({ status: 200, stations, message: "liked stations" });
    } else {
      res
        .status(400)
        .json({ status: 400, message: "can't find liked stations" });
    }
  } catch (err) {
    console.log(err.stack);
  }
};

// POST STATION  being used

// [email, email, email]  add this to collection.
// - postStationLiked  need to push user into line 61 updateOne.
// - line 66 include likeList
// - push users email into array.

const postStationLiked = async (req, res) => {
  // console.log("test error");

  const { id, email } = req.body;

  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("db-name");
    const likedStation = await db
      .collection("likedStations")
      .findOne({ stationId: id });

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
      const numberOfLikes = likedStation.numLikes;
      const userList = [...likedStation.users, email];

      // Update user to include stationId in likedStation array
      userFromDb.likedStations.push(id);
      const userQueryObj = { email };
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
      await db.collection("appUsers").updateOne(userQueryObj, updateUserObj);

      await db
        .collection("likedStations")
        .insertOne({ stationId: id, numLikes: 1, users: [email] });
    }
    res.status(200).json({ status: 200, message: "station liked" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: 400, message: "couldn't like station" });
  }
};

// POST USER  ok

const postUsers = async (req, res) => {
  try {
    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("db-name");
    const exsistingUser = await db
      .collection("appUsers")
      .findOne({ email: req.body.email });
    if (!exsistingUser) {
      await db.collection("appUsers").insertOne(req.body);
    }

    res.status(200).json({ status: 200, message: "user added to database" });
  } catch (error) {
    res
      .status(400)
      .json({ status: 400, message: "couldn't add user to database" });
  }
};

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

const removeLikeFromStation = async (req, res) => {
  res.send(200);
};

module.exports = {
  postUsers,
  postStationLiked,
  getLikedStations,
  getUser,
  removeLikeFromStation,
};
