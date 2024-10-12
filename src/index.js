require('dotenv').config();
require('./database/db');

const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 4400;
const routeHandler = require('./routes/routes');
const helmet = require('helmet');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');

const app = express();

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

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://unpkg.com", (req, res) => `'nonce-${res.locals.nonce}'`],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);

/* app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.header('origin'));
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Referer");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

 */
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

