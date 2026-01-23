import './globals.css';
import { Plus_Jakarta_Sans } from 'next/font/google';

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${jakarta.className} bg-white text-black`}>
        <nav className="max-w-5xl mx-auto p-6 flex justify-between items-center">
          <div className="text-xl font-black italic">VIRTUE<span className="text-blue-700">.ID</span></div>
          <div className="space-x-6 text-sm font-bold">
            <a href="/" className="hover:text-blue-700">HOME</a>
            <a href="/tools" className="hover:text-blue-700">TOOLS</a>
            <a href="/store" className="hover:text-blue-700">STORE</a>
          </div>
        </nav>
        {children}
        <footer className="text-center py-10 text-gray-400 text-xs border-t mt-20">
          © 2026 VIRTUE ID - LOGISTICS & DIGITAL SOLUTIONS
        </footer>
      </body>
    </html>
  );
}
