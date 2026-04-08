const express = require('express');
const userRoutes = require('./routes/userRoutes.js');
const candidateRoutes = require('./routes/candidateRoutes.js');
const db = require('./db.js');

const app = express();

require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.use('/user' , userRoutes);
app.use('/candidate' ,  candidateRoutes);

app.listen(PORT , () => {
    console.log(`Server is listening on port ${PORT}`);
})