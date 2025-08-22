const express = require('express');

const metaRouter = new express.Router();

metaRouter.get('/_meta/health', (req, res) => {
  res.send({ success: true });
});

module.exports = metaRouter;