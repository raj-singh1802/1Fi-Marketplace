import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="text-center py-20 space-y-3">
            <h2 className="text-xl font-bold text-gray-800">Page not found</h2>
            <p className="text-gray-400 text-sm">The page you're looking for doesn't exist.</p>
            <Link to="/" className="text-purple-600 font-semibold underline text-sm">
                Back to Home
            </Link>
        </div>
    );
}