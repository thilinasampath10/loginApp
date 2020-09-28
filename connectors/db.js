//const config = require('config.json');
const mongoose = require('mongoose');
//const t = require('dotenv').config({ path: 'ENV_FILENAME' });
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect("mongodb://localhost/loginData",connectionOptions);
mongoose.Promise = global.Promise;

module.exports = {
    User1: require('../src/schema')
};
//process.env.MONGODB_URI ||
//process.env.MONGODB_URI || config.connectionString
