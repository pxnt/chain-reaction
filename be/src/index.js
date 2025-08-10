const http = require('http');
const bootResource = require('./boot/resource');
const bootApp = require('./boot/app');
const bootSocket = require('./boot/socket');
const config = require('./config');

bootResource().then(() => {
  const app = bootApp();

  const server = http.createServer(app);

  bootSocket(server);

  server.listen(config.port, '0.0.0.0', () => {
    console.log(`Server started on port ${config.port}, PID ${process.pid}`);
    console.log(`Server is accessible at http://localhost:${config.port}`);
  });
  server.keepAliveTimeout = 60 * 1000;
}).catch(err => {
  console.log(err);
});

// const boot = async () => {
//   try {
//     await bootResource();
//     const app = bootApp();

//     const server = http.createServer(app);
  
//     bootSocket(server);

//     server.listen(config.port, () => {
//       console.log(`Server started on port ${config.port}, PID ${process.pid}`);
//     });
//     server.keepAliveTimeout = 60 * 1000;
//   } catch (err) {
//     console.log(err);
//   }
// }

// await boot();

// boot().then(() => {
//   // const app = getApp();
//   // const server = http.createServer(app);

//   // server.listen(config.port, () => {
//   //   console.log(`Server started on port ${config.port}, PID ${process.pid}`);
//   // });

//   // server.keepAliveTimeout = 60 * 1000;
//   server.start();
//   bootSocket(server);
// }).catch(err => {
//   console.log(err);
// });