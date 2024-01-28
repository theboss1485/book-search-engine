const db = require('../config/connection.js');
const { User} = require('../models');
const userSeeds = require('./userSeeds.json');
const wipeDatabase = require('./wipeDatabase.js');

db.once('open', async () => {
    
    try {

        await wipeDatabase('User', 'users');
        await User.create(userSeeds);
        console.log('Users seeded!');

    } catch (err) {

        console.error(err);
        process.exit(1);
    }

    process.exit(0);
});
