const express = require('express');
const router = express.Router();
const limiter = require('../config/limiter');
const User = require('../models/user.model');
const Bootcamp = require('../models/bootcamp.model');
const { UniqueConstraintError } = require('sequelize');
const sequelize = require('../database/db');

//Pages
router.get('/', (req, res) => {
  res.render('pages/index')
});

/* router.get('/about', (req, res) => {
  res.render('pages/about')
});

router.get('/bootcamp', (req, res) => {
  res.render('pages/bootcamp', { response: false })
});

router.get('/contact', (req, res) => {
  res.render('pages/contact')
}); */



//Database
router.use(limiter).post('/subscribe', async (req, res) => {
  const { name, email } = req.body;
  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  try {
    const user = await User.create({ name: trimmedName, email: trimmedEmail });
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
          message: 'Email address already exists!'
        }
        res.render('pages/response', { response });
        return
      }
    }
    const response = {
      success: false,
      uniqueConstraintError: false,
      message: 'An error occurred while subscribing. Please try again later.'
    }
    res.render('pages/response', { response });
  }
});

router.use(limiter).post('/register', async (req, res) => {
  console.log(req.body);
  let {
    firstName,
    lastName,
    email,
    phoneNumber,
    course,
    emailConsent,
  } = req.body;

  firstName = firstName.trim();
  lastName = lastName.trim();
  email = email.trim();
  phoneNumber = phoneNumber.trim();

  try {
    await sequelize.transaction(async (transaction) => {
      await Bootcamp.create({ firstName, lastName, email, phoneNumber, course }, { transaction });

      if (emailConsent) {
        const user = await User.findOne({ where: { email } }, { transaction });
        if (!user) {
          await User.update(
            { emailConsent: true },
            {
              where: { email },
              transaction
            }
          );
        }
      }
    });

    const response = {
      success: true,
      status: 'success',
      summary: 'Registration successful.',
      message: 'Thank you for registering! Please, check your email for more information.'
    }
    res.render('pages/bootcamp', { response })
  } catch (error) {
    console.log(error);

    if (error instanceof UniqueConstraintError) {
      if (error.errors.some(e => e.path === 'email' || e.path === 'phoneNumber')) {
        const response = {
          success: false,
          status: 'failed',
          summary: 'Duplicate email address or phone number.',
          message: 'A user with this email address or phone number has already signed up for the bootcamp.'
        }
        res.render('pages/bootcamp', { response });
        return
      }
    }
    const response = {
      success: false,
      status: 'error',
      summary: 'Registration failed.',
      message: 'An error occurred while proccessing your request. Please try again later.'
    }
    res.render('pages/bootcamp', { response });
  }
});

module.exports = router;