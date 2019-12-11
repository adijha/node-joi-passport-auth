require('dotenv').config();
const express = require('express');

const app = express();

const connectDB = require('./config/db');
const postsRoute = require('./routes/posts');

connectDB();
app.use(express.json());
app.use('/posts', postsRoute);

//ROUTES

app.get('/', (req, res) => {
	res.send('We are on home');
});

//server listenn
app.listen(3000, () => {
	console.log('App listening on port 3000!');
});
