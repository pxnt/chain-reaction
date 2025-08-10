const container = require('../container');

exports.redis = () => container.get('redis');