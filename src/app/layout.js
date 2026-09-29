import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Moon Rabbit - Moon Rabbit',
  description: 'What We Do: Moon Rabbit offers a unique Mystical Guided Tour through the bewildering scenery of Northern Pakistan. Our tour packages are all inclusive and only require a simple booking followed by your arrival to a local airport of your choice.',
  icons: {
    icon: '/assets/MOON-RABBIT-Recovered-01-1-scaled.png',
    shortcut: '/assets/MOON-RABBIT-Recovered-01-1-scaled.png',
    apple: '/assets/MOON-RABBIT-Recovered-01-1-scaled.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-black text-white selection:bg-[#D4AF37] selection:text-black antialiased">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
