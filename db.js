import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

let db;
const mongoClient = new MongoClient(process.env.MONGO_URI);
try {
    await mongoClient.connect();
    db = mongoClient.db(process.env.MONGO_DB);
    console.log(`Connected with ${process.env.MONGO_DB} database`);
} catch(err) {
    console.log(err);
}

export default db;