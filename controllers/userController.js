// import res from 'express/lib/response';
import db from '../db.js';

export async function getCart(req, res) {
    const { _id } = res.locals.personalData;

    try {
        const { cart } = await db.collection('personal-data').findOne({ _id });
        let total = 0;

        cart.forEach(book => {
            const value = book.price.replace(',', '.');
            total += parseFloat(value);
        });
        const formattedTotal = '' + total.toFixed(2);

        res.send({ cart, total: formattedTotal });
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function addBookToCart(req, res) {
    const { personalData } = res.locals;

    try {
        const { _id, cart } = personalData;
        cart.push(req.body);

        await db.collection('personal-data').updateOne({ _id },
            {$set: { cart }});
        res.status(201).send('Livro adicionado ao carrinho!');
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function removeBookFromCart(req, res) {
    const { personalData } = res.locals;
    const { book } = req.body;

    try {
        const { _id, cart } = personalData;
        const index = cart.findIndex(elem => elem._id === book._id);
        cart.splice(index, 1);

        await db.collection('personal-data').updateOne({ _id },
            {$set: { cart }});
        res.status(200).send('Livro removido do carrinho!');
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function registerOrder(req, res) {
    const { body } = req;
    const { personalData } = res.locals;
    const { _id, cart } = personalData;

    try {
        let total = 0;

        cart.forEach(book => {
            const value = book.price.replace(',', '.');
            total += parseFloat(value);
        });

        await db.collection('personal-data').updateOne({ _id },
            {$set: { 
                phone: body.phone,
                address: body.address,
            }});
        await db.collection('orders').insertOne({
            userId: _id,
            address: body.address,
            price: total,
            cart,
        });
        await db.collection('personal-data').updateOne({ _id }, {$set: { cart: [] }});
    }catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
}

export async function getWishlist(req, res) {
    const { personalData } = res.locals;
    res.status(201).send(personalData.wishlist)
    console.log(personalData.wishlist)
}

export async function deleteBook(req, res){
    const { elem } = req.body;
    console.log("body", elem)
    const { _id, wishlist } = res.locals.personalData;

    const newList = wishlist.filter(book => book._id !== elem._id);

    console.log('wish', newList)
    try {
        await db.collection('personal-data').updateOne({ _id },
            {$set: { wishlist: newList }});
        res.status(201).send('Livro retirado da lista!')
    }catch(e) {
        res.sendStatus(500);
    }
}