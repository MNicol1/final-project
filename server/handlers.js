const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

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

module.exports = { postUsers };
