const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL = process.env.MONGO_URI;

mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on('connected' , ()=> {
    console.log('Connected to MongoDB Server');
})

db.on('error' , (err)=> {
    console.log('MongoDB connection error : ' , err);
})

db.on('disconnected' , ()=> {
    console.log('Disconnected from MongoDB Server');
})

module.exports = db;