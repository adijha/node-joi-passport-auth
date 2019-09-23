const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
require('dotenv').config();

const bid = require('./bid');

const app = express();

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB Connected'));

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(cors());
app.use('/api/bid', bid);

// chk  app.use('/api/bid',bid);

const orderSchema = new mongoose.Schema(
  {
    image: { data: Buffer, contentType: String },
    price: Number,
    frame: String,
    quantity: Number,
    name: String,
    number: Number,
    address: String
  },
  { timestamps: true }
);

const styleSchema = {
  value: String,
  price: Number
};

const sizeSchema = {
  value: String,
  price: Number
};

const userSchema = {
  email: String,
  password: String
};

const Order = mongoose.model('Order', orderSchema);
const Style = mongoose.model('Style', styleSchema);
const Size = mongoose.model('Size', sizeSchema);
const User = mongoose.model('User', userSchema);

app.post('/api/order', function(req, res) {
  const order = new Order({
    image: req.body.image,
    price: req.body.price,
    frame: req.body.frame,
    quantity: req.body.quantity,
    name: req.body.name,
    number: req.body.number,
    address: req.body.address
  });

  order.save(function(err) {
    if (!err) {
      console.log('order saved to database');
    }
  });
});

app.post('/api/createStyle', function(req, res) {
  const body = JSON.parse(req.body);
  const style = new Style({
    value: body.value,
    price: body.price
  });

  style.save(function(err) {
    if (!err) {
      console.log('style saved to database');
    }
  });
});

app.post('/api/createSize', function(req, res) {
  const body = JSON.parse(req.body);
  const size = new Size({
    value: body.value,
    price: body.price
  });
  size.save(function(err) {
    if (!err) {
      console.log('size saved to DB');
    }
  });
});

app.get('/api/sizeList', function(req, res) {
  Size.find({}, function(err, sizes) {
    res.send(sizes);
  });
});

app.get('/api/styleList', function(req, res) {
  Style.find({}, function(err, sizes) {
    res.send(sizes);
  });
});

app.post('/api/register', function(req, res) {
  const body = JSON.parse(req.body);
  console.log(body);
  const newUser = new User({
    email: body.email,
    password: body.password
  });
  newUser.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      res.send('new user created');
    }
  });
});

app.post('/api/login', function(req, res) {
  User.findOne({ email: req.body.username }, function(err, foundUser) {
    if (err) {
      console.log('err');
      res.send('user not found');
    } else {
      if (foundUser) {
        if (foundUser.password === req.body.password) {
          console.log('user found');
          return res.json({ user: 'found' });
        }
      }
    }
  });
});

const port = process.env.PORT || 8001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
