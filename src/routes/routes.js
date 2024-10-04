const express = require('express');
const router = express.Router();
const limiter = require('../config/rate-limiter');
const { Waitlist, Bootcamp, Visitor } = require('../database/db');

const { UniqueConstraintError } = require('sequelize');
const { sequelize } = require('../database/db');
const team = require('../database/data/team');
const courses = require('../database/data/courses');
const { v4: uuidv4 } = require('uuid');
const logger = require("../config/winston");


function isCookieExpired(cookieMaxAge) {
  const cookieExpiresAt = new Date(Date.now() + cookieMaxAge);
  return (Date.now() > cookieExpiresAt.getTime())
}

router.use(async (req, res, next) => {
  const cookieMaxAge = 3600000; // 1 hour
  const sessionId = req.cookies.sessionId;
  const ipAddress = req.ip;
  const userAgent = req.headers['user-agent'];
  const referrer = req.headers.referer || 'Direct';
  const visitTimestamp = new Date().toISOString();

  try {
    if (sessionId) {
      const visitor = await Visitor.findOne({ where: { sessionId } });
      if (!visitor) {
        await Visitor.create({ sessionId, ipAddress, userAgent, referrer, visitTimestamp });
        logger.info({
          message: 'New visitor detected',
          sessionId,
          ip: ipAddress,
          route: req.url,
          userAgent,
          timestamp: visitTimestamp,
        });
      } else {
        if (isCookieExpired(cookieMaxAge)) {
          const newSessionId = uuidv4();
          res.cookie('sessionId', newSessionId, { httpOnly: true, maxAge: cookieMaxAge });
          await visitor.update({ sessionId: newSessionId });
          logger.info({
            message: 'Session expired, new session created',
            oldSessionId: sessionId,
            newSessionId,
            ip: ipAddress,
            timestamp: visitTimestamp,
          });
        }
      }
    } else {
      const newSessionId = uuidv4();
      res.cookie('sessionId', newSessionId, { httpOnly: true, maxAge: cookieMaxAge });
      await Visitor.create({ sessionId: newSessionId, ipAddress, userAgent, referrer, visitTimestamp });
      logger.info({
        message: 'New visitor detected',
        sessionId: newSessionId,
        ip: ipAddress,
        route: req.url,
        userAgent,
        timestamp: visitTimestamp,
      });
    }
  } catch (error) {
    console.error(error);
    logger.error({
      message: 'Error processing visitor tracking',
      error: error.message,
      ip: ipAddress,
      timestamp: visitTimestamp,
    });
  }
  next();
});

//Pages
router.get('/', (req, res) => {
  const cookieSession = req.cookies.sessionId;

  res.render('pages/index', {
    nonce: res.locals.nonce,
    cookieSession
  })
});

router.get('/about', (req, res) => {
  const cookieSession = req.cookies.sessionId;

  res.render('pages/about', {
    nonce: res.locals.nonce,
    team,
    cookieSession
  })
});

router.get('/bootcamp', (req, res) => {
  const cookieSession = req.cookies.sessionId;

  res.render('pages/bootcamp', { 
    nonce: res.locals.nonce, 
    response: false,
    courses,
    cookieSession
  })
});

router.get('/contact', (req, res) => {
  const cookieSession = req.cookies.sessionId;

  res.render('pages/contact', { 
    nonce: res.locals.nonce,
    cookieSession
  })
});



//Database
router.use(limiter).post('/subscribe', async (req, res) => {
  const { name, email } = req.body;
  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  try {
    const user = await Waitlist.create({ name: trimmedName, email: trimmedEmail });
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
  const cookieSession = req.cookies.sessionId;
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
        const user = await Waitlist.findOne({ where: { email } }, { transaction });
        if (!user) {
          await Waitlist.update(
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
    res.render('pages/bootcamp', { response, courses, cookieSession })
  } catch (error) {
    //console.log(error);

    if (error instanceof UniqueConstraintError) {
      if (error.errors.some(e => e.path === 'email' || e.path === 'phoneNumber')) {
        const response = {
          success: false,
          status: 'failed',
          summary: 'Duplicate email address or phone number.',
          message: 'A user with this email address or phone number has already signed up for the bootcamp.'
        }
        res.render('pages/bootcamp', { response, courses, cookieSession });
      }
      return
    }
    const response = {
      success: false,
      status: 'error',
      summary: 'Registration failed.',
      message: 'An error occurred while proccessing your request. Please try again later.'
    }
    res.render('pages/bootcamp', { response, courses, cookieSession });
  }
});

module.exports = router;