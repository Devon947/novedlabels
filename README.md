# NovedLabels Shipping Platform

A modern, responsive web application for creating and managing shipping labels. This application integrates with multiple shipping providers to offer the best rates and seamless label generation.

## 🚀 Features

- **Multi-provider Support**: Integrates with EasyPost, PirateShip, Stamps.com, and Shippo
- **Shipping Label Generation**: Create shipping labels with ease
- **Rate Comparison**: Automatically compares rates from different providers
- **Shipping History**: Track all your previous shipments
- **Responsive UI**: Works on desktop, tablet, and mobile devices
- **PWA Support**: Can be installed as a Progressive Web App
- **Offline Functionality**: Core features work even without internet
- **Dark Mode**: Easy on the eyes with a dark-themed UI

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **UI Components**: Framer Motion for animations
- **State Management**: React Context API
- **Data Storage**: Supabase for authentication and data
- **APIs**: EasyPost, Shippo, PirateShip, Stamps.com
- **Deployment**: Vercel

## 📋 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/novedlabels-shipping.git
cd novedlabels-shipping
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env.local` file in the project root with the following variables:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
ENCRYPTION_KEY=your_32_char_encryption_key
EASYPOST_API_KEY=your_easypost_api_key
```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 💻 Development

### Project Structure

- `app/` - Next.js app directory
  - `components/` - UI components
  - `contexts/` - React Context providers
  - `services/` - Service layer for APIs and storage
  - `page.js` - Main app page
- `lib/` - Shared utilities and configurations
- `public/` - Static assets and PWA files

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run linting checks
- `npm run format` - Format code with Prettier

## 🌐 Deployment

The app is configured for easy deployment on Vercel:

```bash
vercel
```

## 🔒 Security

- All sensitive data is encrypted before storage
- Authentication handled by Supabase
- API keys are never exposed to the client
- CSP headers for protection against XSS

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Supabase](https://supabase.io/)
- [EasyPost](https://www.easypost.com/)
- [Shippo](https://goshippo.com/)
- [PirateShip](https://www.pirateship.com/)
- [Stamps.com](https://www.stamps.com/)