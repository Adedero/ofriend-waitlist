const express = require('express');
const router = express.Router();
const limiter = require('../config/limiter');
const User = require('../models/user.model');
const { UniqueConstraintError } = require('sequelize');

//Pages
router.get('/', (req, res) => {
  res.render('pages/index')
});

router.get('/about', (req, res) => {
  res.render('pages/about')
});


//Database
router.use(limiter).post('/subscribe', async (req, res) => {
  const { name, email } = req.body;
  console.log(req.headers);
  /* 
  try {
    const user = await User.create({ name, email });
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      if (error.errors.some(e => e.path === 'email')) {
        const previousPage = req.headers.referer || '/';

        res.render(previousPage, {
          error: true,
          errorMessage: 'This email address is already in use!'
        });
      }
    }
  } */
});

module.exports = router;