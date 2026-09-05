import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
    return (
        <Link
            to={`/products/${product.slug}`}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-4 flex flex-col gap-3"
        >
            <div className="bg-gray-50 rounded-xl aspect-square flex items-center justify-center overflow-hidden">
                {product.thumbnailImage ? (
                    <img
                        src={product.thumbnailImage}
                        alt={product.name}
                        className="object-contain w-full h-full"
                    />
                ) : (
                    <span className="text-gray-300 text-sm">No image</span>
                )}
            </div>
            <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide truncate">{product.brand}</p>
                <h3 className="font-semibold text-gray-800 truncate">{product.name}</h3>
                <p className="text-purple-700 font-bold mt-1">
                    ₹{product.minPrice.toLocaleString('en-IN')}
                </p>
            </div>
        </Link>
    );
}