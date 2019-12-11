

const express = require('express');

const app = express();


//ROUTES
app.get('/', (req, res) => {
	res.send('We are on home');
});

//server listen
app.listen(3000, () => {
	console.log('App listening on port 3000!');
});
