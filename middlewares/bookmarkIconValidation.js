import db from '../db.js';

export async function selectBookmarkIcon(req, res, next) {
    const { elem } = req.body;
    const { personalData } = res.locals;
    const { wishlist, _id } = personalData;

   const selectedBook = wishlist.filter((book) => book._id === elem._id);
    
    try {
        if (selectedBook.length !== 0) {
            const index = wishlist.findIndex( (book) => book._id === elem._id);
            wishlist.splice(index, 1);
            await db.collection('personal-data').updateOne({ _id },
                {$set: { wishlist }});
            res.status(201).send('Livro retirado da lista!')
        } else {
            wishlist.push(elem);
            await db.collection('personal-data').updateOne({ _id },
                {$set: { wishlist }});
            res.status(200).send('Livro adicionado à lista!');
        }  
    }catch(e) {
        res.sendStatus(500);
    }

    next();
}
