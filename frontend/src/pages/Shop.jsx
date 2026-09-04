import { Link } from 'react-router-dom';

const options = [
  {
    to: '/shop/top-brands',
    label: 'Top Brands',
    description: 'Explore leading global electronics brands',
    icon: '🏷️',
    badge: 'Placeholder',
  },
  {
    to: '/shop/nearby-stores',
    label: 'Nearby Stores',
    description: 'Discover local partner retailers near you',
    icon: '📍',
    badge: 'Placeholder',
  },
  {
    to: '/marketplace',
    label: '1Fi Marketplace',
    description: 'Browse phones & laptops backed by zero-cost EMIs',
    icon: '🛒',
    highlight: true,
  },
];

export default function Shop() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Shop</h1>
        <p className="text-sm text-gray-500 mt-1">Select a category to start browsing</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {options.map((opt) => (
          <Link
            key={opt.to}
            to={opt.to}
            className={`group rounded-2xl p-6 flex flex-col items-start justify-between gap-4 transition-all border ${
              opt.highlight
                ? 'bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200 shadow-sm hover:shadow-md hover:border-purple-400'
                : 'bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <span className="text-3xl p-3 bg-white rounded-xl shadow-xs border border-gray-100 group-hover:scale-110 transition-transform">
                {opt.icon}
              </span>
              {opt.badge && (
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                  {opt.badge}
                </span>
              )}
            </div>

            <div>
              <h3 className={`font-bold text-base ${opt.highlight ? 'text-purple-900' : 'text-gray-900'}`}>
                {opt.label}
              </h3>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">{opt.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
