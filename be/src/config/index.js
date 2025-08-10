const dotenv = require('dotenv');

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
} else {
  dotenv.config({ path: '.env.production' });
}

module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8080,

  redis: process.env.REDIS || '',
};