import db from '../db.js';

export async function getCart(req, res) {
    const { _id } = res.locals.personalData;

    try {
        const { cart } = await db.collection('personal-data').findOne({ _id });
        let total;

        cart.forEach(book => {
            const value = book.price.replace(',', '.');
            total =+ parseFloat(value);
        });

        res.send({ cart, total });
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
        console.log(cart);
        await db.collection('personal-data').updateOne({ _id },
            {$set: { cart }});
        res.status(201).send('Livro adicionado ao carrinho!');
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
}