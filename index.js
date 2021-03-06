const error = require('./middleware/error');
const config = require('config');
const customers = require('./routes/customers');
const express = require('express');
const app = express();
const mongoose = require('mongoose');




mongoose.connect('mongodb://localhost:27017/Vildy', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

app.use(express.json());
app.use('/api/customers', customers);
app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));