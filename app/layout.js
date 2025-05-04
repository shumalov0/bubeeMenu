import './globals.css';
import { LanguageProvider } from './context/LanguageContext';

export const metadata = {
  title: 'Bubee Menu',
  description: 'Bubble Drinks Menu Application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-primary text-textPrimary min-h-screen">
        <LanguageProvider>
          <main className="max-w-md mx-auto pb-24">
            {children}
          </main>
        </LanguageProvider>
      </body>
    </html>
  );
} 