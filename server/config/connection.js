// This file sets up the connection to the mongoose database.
require('dotenv').config()
const mongoose = require('mongoose');

let atlastConnectionString = undefined

if(process.env.MONGODB_URI){

    atlastConnectionString = encodeURI(process.env.MONGODB_URI)
}

mongoose.connect(atlastConnectionString || process.env.LOCALHOST_DB_CONNECTION);

module.exports = mongoose.connection;
