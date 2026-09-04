import { useEffect, useState, useCallback } from 'react';
import { fetchProducts } from '../api/products';
import ProductCard from '../components/ProductCard';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

export default function Marketplace() {
    const [products, setProducts] = useState([]);
    const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'

    const loadProducts = useCallback(() => {
        setStatus('loading');
        fetchProducts()
            .then((data) => {
                setProducts(data);
                setStatus('success');
            })
            .catch(() => setStatus('error'));
    }, []);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    if (status === 'loading') return <LoadingState label="Loading products..." />;
    if (status === 'error') {
        return <ErrorState message="Couldn't load products." onRetry={loadProducts} />;
    }
    if (products.length === 0) {
        return <p className="text-center text-gray-400 py-20">No products available yet.</p>;
    }

    return (
        <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">1Fi Marketplace</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}