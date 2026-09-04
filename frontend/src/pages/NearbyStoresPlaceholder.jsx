import { Link } from 'react-router-dom';

export default function NearbyStoresPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
      <span className="text-5xl p-4 bg-purple-50 rounded-2xl">📍</span>
      <div>
        <h2 className="text-xl font-bold text-gray-800">Nearby Stores</h2>
        <p className="text-sm text-gray-500 mt-1">This section is a placeholder for local offline store discovery.</p>
      </div>
      <Link
        to="/shop"
        className="text-xs font-semibold text-purple-600 hover:text-purple-700 underline pt-2"
      >
        ← Back to Shop options
      </Link>
    </div>
  );
}
