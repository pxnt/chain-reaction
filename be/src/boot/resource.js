const redis = require('../resources/redis');

module.exports = async () => {
  await redis.load();
  console.log('Resources booted successfully');
}