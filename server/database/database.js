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

export async function getAll() {
  let tweetCollection = db.collection("tweets");
  let tweets = await tweetCollection.find().toArray();

  return Promise.all(
    tweets.map(async (tweet) => {
      const { username, name, url } = await findById(tweet.userId);
      return { ...tweet, username, name, url };
    })
  );
}

export async function getAllByUsername(username) {
  return getAll().then((tweets) =>
    tweets.filter((tweet) => tweet.username === username)
  );
}

export async function getById(id) {
  let tweetCollection = db.collection("tweets");

  const filter = { _id: new ObjectId(id) };
  const tweet = await tweetCollection.findOne(filter);

  if (!tweet) {
    return null;
  }
  const { username, name, url } = await findById(tweet.userId);
  return { ...tweet, username, name, url };
}

export async function create(content, userId) {
  let tweetCollection = db.collection("tweets");
  return tweetCollection
    .insertOne({
      content,
      userId,
    })
    .then((result) => result.insertedId)
    .then((id) => getById(id));
}

export async function update(id, content) {
  let tweetCollection = db.collection("tweets");

  const filter = { _id: new ObjectId(id) };
  const update = {
    $set: {
      content,
    },
  };
  await tweetCollection.updateOne(filter, update);
  return getById(id);
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
