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

export function getAll(username = undefined) {
  let tweetCollection = db.collection("tweets");
  if (username === undefined) {
    return tweetCollection.find().toArray();
  } else {
    return tweetCollection.find({ username }).toArray();
  }
}

export function getById(id) {
  let tweetCollection = db.collection("tweets");
  try {
    const filter = { _id: new ObjectId(id) };
    return tweetCollection.find(filter).toArray();
  } catch (err) {
    throw new Error(err);
  }
}

export function create(username, name, content, url) {
  let tweetCollection = db.collection("tweets");
  return tweetCollection
    .insertOne({
      content,
      name,
      username,
      url,
    })
    .then((result) => result.insertedId)
    .then((id) => tweetCollection.findOne({ _id: new ObjectId(id) }));
}

export function update(id, content) {
  let tweetCollection = db.collection("tweets");

  try {
    const filter = { _id: new ObjectId(id) };
    const update = {
      $set: {
        content,
      },
    };
    tweetCollection.updateOne(filter, update);
    return tweetCollection.findOne(filter);
  } catch (err) {
    throw new Error(err);
  }
}

export function remove(id) {
  let tweetCollection = db.collection("tweets");

  try {
    return tweetCollection.deleteOne({ _id: new ObjectId(id) });
  } catch (err) {
    throw new Error(err);
  }
}
