# Chain Reaction V2

A modern web application built with Vue 3, TypeScript, and Socket.IO for real-time multiplayer gaming.

## 🚀 Features

- Real-time multiplayer gameplay using Socket.IO
- Modern UI with Vue 3 and TypeScript
- State management with Pinia
- Responsive design with Tailwind CSS
- Toast notifications with Vue Toastification
- Type-safe development with TypeScript

## 🛠️ Tech Stack

- **Frontend Framework:** Vue 3
- **Language:** TypeScript
- **State Management:** Pinia
- **Styling:** Tailwind CSS
- **Real-time Communication:** Socket.IO
- **HTTP Client:** Axios
- **Build Tool:** Vite
- **Package Manager:** pnpm

## 📦 Prerequisites

- Node.js (version specified in .nvmrc)
- pnpm 8.6.2

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/chain-reaction-v2.git
   cd chain-reaction-v2
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   - Copy `.env.dev` to `.env`
   - Update the environment variables as needed

4. **Start the development server**

   ```bash
   pnpm dev
   ```

5. **Build for production**
   ```bash
   pnpm build
   ```

## 📁 Project Structure

```
src/
├── assets/         # Static assets
├── components/     # Reusable Vue components
├── config/         # Configuration files
├── directives/     # Vue custom directives
├── helpers/        # Helper functions
├── layouts/        # Layout components
├── plugins/        # Vue plugins
├── router/         # Vue Router configuration
├── services/       # API and service layer
├── store/          # Pinia store modules
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
├── views/          # Page components
├── App.vue         # Root component
└── main.ts         # Application entry point
```

## 🧪 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint issues

## 🧩 Dependencies

### Core Dependencies

- Vue 3
- Vue Router
- Pinia
- Socket.IO Client
- Axios
- Vue Toastification

### Development Dependencies

- TypeScript
- Vite
- Tailwind CSS
- ESLint
- PostCSS
- SASS

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Vue.js team for the amazing framework
- Socket.IO for real-time capabilities
- Tailwind CSS for the utility-first CSS framework
