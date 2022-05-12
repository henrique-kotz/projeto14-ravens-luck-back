import db from '../db.js';

export async function getBooks(req, res) {
    try {
        const books = await db.collection('books').find().toArray();
        res.send(books.reverse());
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
}