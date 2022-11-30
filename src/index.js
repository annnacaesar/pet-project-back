const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const { config } = require('./config');
const { Logger } = require('./library');
const { handlers } = require('./helpers');
const { AuthRouter, UserRouter, NoticeRouter, NewsRouter, SponsorRouter } = require('./routes');

const app = express();

/** Connect to Mongo */
mongoose
  .connect(config.mongo.url)
  .then(() => {
    Logger.info('Connected to mongoDB');
    StartServer();
  })
  .catch((error) => {
    Logger.error('Unable to connect');
    Logger.error(error);
  });

/** Only start the server if Mongo connects */
const StartServer = () => {
  app.use((req, res, next) => {
    Logger.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
      Logger.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
    });

    next();
  });

  app.use(cors({ origin: '*' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.static('src/public'));

  /** Rules of our API */
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }

    next();
  });

  /** Routes */
  app.use('/api/auth', AuthRouter);
  app.use('/api/user', UserRouter);
  app.use('/api/notice', NoticeRouter);
  app.use('/api/news', NewsRouter);
  app.use('/api/sponsor', SponsorRouter);

  app.use(handlers.unknownRoute);
  app.use(handlers.error);

  http.createServer(app).listen(config.server.port, () => {
    Logger.info(`Server is running on port ${config.server.port}`);
  });
};
