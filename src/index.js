require('dotenv').config();
require('./database/db');

const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 4400;
const routeHandler = require('./routes/routes');
const helmet = require('helmet');

const app = express();

//Middleware
app.use(helmet());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.header('origin'));
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Referer");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.resolve('public')));
app.use('/primeicons', express.static(path.resolve('node_modules/primeicons')));
app.use('/fontsource', express.static(path.resolve('node_modules/@fontsource-variable')));

//Configurations
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use('/', routeHandler);
app.use(function (req, res) {
  res.status(404).render('pages/404');
});

app.listen(PORT, () => {
  console.log(`Server started on ${process.env.NODE_ENV === 'production' ? `port ${PORT}` : `http://localhost:${PORT}`}`)
});

