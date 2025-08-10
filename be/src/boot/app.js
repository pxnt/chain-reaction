const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const roomRouter = require('../routes/room');
const metaRouter = require('../routes/meta');

module.exports = () => {
  const app = express();

  // CORS configuration
  app.use(cors({
    origin: true, // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true
  }));

  // Pre-flight requests
  app.options('*', cors());

  app.use(cookieParser());
  app.use(compression());
  app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
  }));
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: true,
    parameterLimit: 5000,
  }));

  app.use('/', roomRouter);
  app.use('/', metaRouter);

  return app;
}