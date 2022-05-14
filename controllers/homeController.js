import db from '../db.js';
import { ObjectId } from 'mongodb';

export async function getBooks(req, res) {
    try {
        const books = await db.collection('books').find().toArray();
        res.send(books.reverse());
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function getOneBook(req, res) {
    const { bookId } = req.params;

    try {
        const book = await db.collection('books').findOne({ _id: new ObjectId(bookId) });
        res.send(book);
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
}