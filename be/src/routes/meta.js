const express = require('express');

const metaRouter = new express.Router();

metaRouter.get('/meta', (req, res) => {
  res.send('Hello World');
});

module.exports = metaRouter;