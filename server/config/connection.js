// This file sets up the connection to the mongoose database.
require('dotenv').config()
const mongoose = require('mongoose');

console.log(process.env)
mongoose.connect(process.env.MONGODB_URI || process.env.LOCALHOST_DB_CONNECTION);

module.exports = mongoose.connection;
