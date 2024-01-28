const db = require('../config/connection.js');
const models = require('../models')

// I took this function from activity 26 of module 21.
module.exports = async (modelName, collectionName) => {
    try {

        let modelExists = await models[modelName].db.db.listCollections({

            name: collectionName

        }).toArray()
    
        if (modelExists.length) {

            await db.dropCollection(collectionName);
        }

    } catch (err) {

        throw err;
    }
}