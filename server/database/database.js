import Mongodb from "mongodb";
import { config } from "../config.js";

export async function connectDB() {
  return Mongodb.MongoClient.connect(config.db.host) //
    .then((client) => client.db());
}
