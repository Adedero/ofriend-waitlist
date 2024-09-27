require('dotenv').config();
require('./database/db');

const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 4400;
const routeHandler = require('./routes/routes');

const app = express();

//Middleware
app.use(express.static(path.resolve('public')));
app.use('/primeicons', express.static(path.resolve('node_modules/primeicons')));
app.use('/fontsource', express.static(path.resolve('node_modules/@fontsource-variable')));

//Configurations
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use('/', routeHandler);

app.listen(PORT, () => {
  console.log(`Server started on ${process.env.NODE_ENV === 'production' ? `port ${PORT}` : `http://localhost:${PORT}`}`)
});

