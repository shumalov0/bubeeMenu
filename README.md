# BubeeMenu - Bubble Drinks Menu Application

A modern, responsive menu application for bubble drinks and food businesses, built with Next.js and TailwindCSS.

## Features

- Modern, dark-themed UI similar to food delivery apps
- Multi-language support with 7 languages (Azerbaijani, Arabic, Turkish, Polish, English, Russian, Uzbek)
- Language selection screen on first visit
- Category-based menu display
- Horizontal scrollable category tabs
- Menu items with images, prices, and preparation time
- Cart functionality to add items
- Mobile-first responsive design

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/bubee-menu.git
cd bubee-menu
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/app` - Next.js application files
- `/app/components` - React components
- `/app/context` - Context providers (language)
- `/app/data` - Menu data and translations
- `/public/images` - Images for menu items and flags

## Customizing the Menu

Edit the menu data in `app/data/menuData.js` to add your own menu items, categories, and images.

## Adding or Modifying Languages

Edit the translations in `app/data/translations.js` to add or modify languages.

## Deployment

This application can be deployed on Vercel, Netlify, or any other platform that supports Next.js.

```bash
npm run build
# or
yarn build
```

## License

MIT # bubeeMenu
