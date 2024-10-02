const anonymizeIp = require('../utils/ip-anonymize');

const useTracker = async (req, sessId, store, logger) => {
  const sessionId = sessId
  const ipAddress = anonymizeIp(req.ip);
  const userAgent = req.headers['user-agent'];
  const referrer = req.headers.referer || 'Direct';
  const visitTimestamp = new Date().toISOString();

  try {
    const sessionId = await store.findOne({ where: { sessionId } });
    if (sessionId) {
      await sessionId.update({ visitTimestamp })
    } else {
      await store.create({
        sessionId, ipAddress, userAgent, referrer, visitTimestamp
      });
    }
  } catch (error) {
    console.log('Error saving session: ', error.message)
    logger.error({
      message: 'Failed to save session.',
      sessionId
    });
  }
}

module.exports = useTracker;