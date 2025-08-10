const constants = require('../config/constants');

exports.generateRandomId = () => Math.random().toString(36).substring(2, constants.ROOM_ID_LENGTH + 2);