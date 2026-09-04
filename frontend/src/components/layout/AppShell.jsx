import Navbar from './Navbar';
import BottomNav from './BottomNav';

export default function AppShell({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col text-gray-900 font-sans antialiased">
      <Navbar />
      <main className="flex-1 pb-24 md:pb-12 max-w-5xl w-full mx-auto px-4 py-6">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
