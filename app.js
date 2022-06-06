const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

const authenticate = require('./authenticate');
const campsiteRouter = require('./routes/campsiteRouter');
const promotionRouter = require('./routes/promotionRouter');
const partnerRouter = require('./routes/partnerRouter');
const usersRouter = require('./routes/users');
const favoriteRouter = require('./routes/favoriteRouter');
const config = require('./config');
const uploadRouter = require('./routes/uploadRouter');

const url = config.mongoUrl;
const connect = mongoose.connect(url, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

connect.then(() => console.log('Connected correctly to server'),
  err => console.log(err)
);

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use('/campsites', campsiteRouter);
app.use('/promotions', promotionRouter);
app.use('/partners', partnerRouter);
app.use('/users', usersRouter);
app.use('/imageUpload', uploadRouter);
app.use('/favorites', favoriteRouter);

app.use(express.static(__dirname + '/public'));

app.use((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});