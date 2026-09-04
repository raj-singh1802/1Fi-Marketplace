import { NavLink, Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <Link to="/" className="flex items-center gap-2">
        <span className="text-2xl font-black bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
          1Fi
        </span>
      </Link>
      <nav className="flex gap-6 text-sm font-medium">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `px-3 py-1.5 rounded-lg transition-colors ${
              isActive ? 'text-purple-600 font-semibold bg-purple-50' : 'text-gray-600 hover:text-gray-900'
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            `px-3 py-1.5 rounded-lg transition-colors ${
              isActive ? 'text-purple-600 font-semibold bg-purple-50' : 'text-gray-600 hover:text-gray-900'
            }`
          }
        >
          Shop
        </NavLink>
      </nav>
    </header>
  );
}
