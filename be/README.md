# Chain Reaction Backend

A robust and scalable backend service for the Chain Reaction game, built with Node.js and Express.

## 🚀 Features

- RESTful API architecture
- WebSocket support using Socket.IO
- Redis integration for caching and real-time features
- Security middleware (Helmet, CORS)
- Request validation using Joi
- Compression and performance optimization
- Modular and maintainable code structure

## 📋 Prerequisites

- Node.js (version specified in .nvmrc)
- pnpm (package manager)
- Redis server

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/chain-reaction-be.git
cd chain-reaction-be
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```
PORT=3000
REDIS_URL=redis://localhost:6379
# Add other environment variables as needed
```

## 🏃‍♂️ Running the Application

### Development Mode
```bash
pnpm dev
```
This will start the server with nodemon for automatic reloading during development.

### Production Mode
```bash
node src/index.js
```

## 📁 Project Structure

```
src/
├── boot/          # Application bootstrapping and initialization
├── config/        # Configuration files
├── controllers/   # Request handlers
├── helpers/       # Helper functions and utilities
├── resources/     # Resource files and static content
├── routes/        # API route definitions
├── utils/         # Utility functions
├── container.js   # Dependency injection container
└── index.js       # Application entry point
```

## 🔧 Dependencies

- **express**: Web framework
- **socket.io**: Real-time communication
- **ioredis**: Redis client
- **helmet**: Security headers
- **joi**: Request validation
- **compression**: Response compression
- **cors**: Cross-Origin Resource Sharing
- **axios**: HTTP client
- **body-parser**: Request body parsing
- **cookie-parser**: Cookie handling

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Prashant Singh**

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape this project
- Special thanks to the open-source community for their invaluable tools and libraries 