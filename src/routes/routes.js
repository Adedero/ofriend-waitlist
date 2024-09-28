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
  try {
    const user = await User.create({ name, email });
    const response = {
      success: true,
      user,
      message: 'Thank you for subscribing!'
    }
    res.render('pages/response', { response });
  } catch (error) {
    console.log(error);
    
    if (error instanceof UniqueConstraintError) {
      if (error.errors.some(e => e.path === 'email')) {
        const response = {
          success: false,
          uniqueConstraintError: true,
          name,
          email,
          message: 'Email address already exists!'
        }
        res.render('pages/response', { response });
        return
      }
    }
    const response = {
      success: false,
      uniqueConstraintError: false,
      name,
      email,
      message: 'An error occurred while subscribing. Please try again later.'
    }
    res.render('pages/response', { response });
  }
});

module.exports = router;