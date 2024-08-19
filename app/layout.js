import './globals.css';

export const metadata = {
  title: 'PDF Storage App',
  description: 'A simple local PDF storage app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
