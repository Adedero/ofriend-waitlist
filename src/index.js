require('dotenv').config();
require('./database/db');

const path = require('path');
const express = require('express');
const PORT = process.env.PORT;
const routeHandler = require('./routes/routes');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');

const app = express();

app.set('trust proxy', '1');

//Middleware 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')))
app.use('/primeicons', express.static(path.join(__dirname, '../node_modules/primeicons')));
app.use('/fontsource', express.static(path.join(__dirname, '../node_modules/@fontsource-variable')));


app.use(cookieParser(
  process.env.SECRET_KEY,
  {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  }
));

app.use((req, res, next) => {
  res.locals.nonce = crypto.randomBytes(16).toString('base64');
  next();
});

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

