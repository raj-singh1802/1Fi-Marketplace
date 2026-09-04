import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home', icon: '🏠' },
  { to: '/shop', label: 'Shop', icon: '🛍️' },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 md:hidden z-50 shadow-lg">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) =>
            `flex flex-col items-center text-xs gap-1 px-4 py-1 rounded-xl transition-colors ${
              isActive ? 'text-purple-600 font-semibold bg-purple-50' : 'text-gray-500 hover:text-gray-700'
            }`
          }
        >
          <span className="text-lg">{item.icon}</span>
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
