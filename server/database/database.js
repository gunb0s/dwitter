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

export async function getAll(username = undefined) {
  let tweetCollection = db.collection("tweets");
  if (username === undefined) {
    return await tweetCollection.find().toArray();
  } else {
    return await tweetCollection.find({ username }).toArray();
  }
}

export async function getById(id) {
  let tweetCollection = db.collection("tweets");
  try {
    const filter = { _id: new ObjectId(id) };
    return await tweetCollection.find(filter).toArray();
  } catch (err) {
    throw new Error(err);
  }
}

export async function create(username, name, content, url) {
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

export async function update(id, content) {
  let tweetCollection = db.collection("tweets");

  try {
    const filter = { _id: new ObjectId(id) };
    const update = {
      $set: {
        content,
      },
    };
    await tweetCollection.updateOne(filter, update);
    return await tweetCollection.findOne(filter);
  } catch (err) {
    throw new Error(err);
  }
}

export async function remove(id) {
  let tweetCollection = db.collection("tweets");

  try {
    return await tweetCollection.deleteOne({ _id: new ObjectId(id) });
  } catch (err) {
    throw new Error(err);
  }
}

export async function findByUsername(username) {
  let authCollection = db.collection("auth");

  return await authCollection.findOne({ username });
}

export async function findById(id) {
  let authCollection = db.collection("auth");

  return await authCollection.findOne({ _id: new ObjectId(id) });
}

export async function createUser(user) {
  const { username, password, name, email, url } = user;
  let authCollection = db.collection("auth");
  return authCollection
    .insertOne({
      username,
      password,
      name,
      email,
      url,
    })
    .then((result) => result.insertedId);
}
