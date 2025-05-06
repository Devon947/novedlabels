import React from 'react';
import { Inter } from 'next/font/google';
import { metadata } from './metadata';
import ClientLayout from './ClientLayout';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { StoreProvider } from './contexts/StoreContext';
import { ThemeProvider } from './contexts/ThemeContext';

const inter = Inter({ subsets: ['latin'] });

export { metadata };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <StoreProvider>
          <ThemeProvider>
            <ClientLayout>{children}</ClientLayout>
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: '#1f2937',
                  color: '#fff',
                  borderRadius: '0.5rem',
                  border: '1px solid #374151',
                },
                success: {
                  iconTheme: {
                    primary: '#10B981',
                    secondary: '#fff',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#EF4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}