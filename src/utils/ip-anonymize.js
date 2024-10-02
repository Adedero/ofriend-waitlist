const anonymizeIp = (ipAddress) => {
  if (ipAddress.includes('.')) {
    return ipAddress.replace(/\.\d+$/, '.0');
  }

  if (ipAddress.includes(':')) {
    return ipAddress.replace(/:[a-f0-9]+$/, ':0000');
  }

  return ipAddress;
}

module.exports = anonymizeIp;