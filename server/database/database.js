import Mongodb from "mongodb";
import { ObjectId } from "mongodb";
import { config } from "../config.js";

let db;
export async function connectDB() {
  return Mongodb.MongoClient.connect(config.db.host) //
    .then((client) => {
      db = client.db("Dwitter");
    });
}

export function getTweets(username = undefined) {
  let tweetCollection = db.collection("tweets");
  if (username === undefined) {
    return tweetCollection.find().toArray();
  } else {
    return tweetCollection.find({ username }).toArray();
  }
}

export function createTweet(username, name, content, url) {
  let tweetCollection = db.collection("tweets");
  return tweetCollection.insertOne({
    content,
    name,
    username,
    url,
  });
}

export function editTweet(id, content) {
  let tweetCollection = db.collection("tweets");

  try {
    const filter = { _id: new ObjectId(id) };
    const update = {
      $set: {
        content,
      },
    };
    return tweetCollection.updateOne(filter, update);
  } catch (err) {
    throw new Error(err);
  }
}

export function deleteTweet(id) {
  let tweetCollection = db.collection("tweets");

  try {
    return tweetCollection.deleteOne({ _id: new ObjectId(id) });
  } catch (err) {
    throw new Error(err);
  }
}
