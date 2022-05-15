import db from '../db.js';

export async function validatePersonalData(req, res, next) {
    const { user } = res.locals;

    try {
        const personalData = await db.collection('personal-data').findOne({ userId: user._id });
        if (personalData) {
            res.locals.personalData = personalData;
        } else {
            const response = await db.collection('personal-data').insertOne({
                userId: user._id,
                phone: "",
                address: {},
                wishlist: [],
                cart: [],
            });
            const newDocument = await db.collection('personal-data').findOne({ _id: response.insertedId });
            res.locals.personalData = newDocument;
        }
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }

    next();
}