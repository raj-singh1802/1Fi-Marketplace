import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductBySlug } from '../api/products';
import VariantSelector from '../components/VariantSelector';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

export default function ProductDetail() {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error' | 'not-found'
    const [selectedVariantId, setSelectedVariantId] = useState(null);

    const loadProduct = useCallback(() => {
        setStatus('loading');
        fetchProductBySlug(slug)
            .then((data) => {
                if (!data) {
                    setStatus('not-found');
                    return;
                }
                setProduct(data);
                setSelectedVariantId(data.variants[0]?.id ?? null);
                setStatus('success');
            })
            .catch(() => setStatus('error'));
    }, [slug]);

    useEffect(() => {
        loadProduct();
    }, [loadProduct]);

    if (status === 'loading') return <LoadingState label="Loading product..." />;
    if (status === 'error') {
        return <ErrorState message="Couldn't load this product." onRetry={loadProduct} />;
    }
    if (status === 'not-found') {
        return <p className="text-center text-gray-400 py-20">Product not found.</p>;
    }

    const selectedVariant = product.variants.find((v) => v.id === selectedVariantId);

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6">
                <span className="inline-block bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                    {product.brand}
                </span>
                <div className="bg-gray-50 rounded-xl aspect-square flex items-center justify-center overflow-hidden mb-4">
                    <img
                        src={selectedVariant.imageUrl}
                        alt={`${product.name} ${selectedVariant.label}`}
                        className="object-contain w-full h-full"
                    />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
                <VariantSelector
                    variants={product.variants}
                    selectedVariantId={selectedVariantId}
                    onSelect={setSelectedVariantId}
                />
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                    Price
                </p>
                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-gray-900">
                        ₹{selectedVariant.price.toLocaleString('en-IN')}
                    </span>
                    {selectedVariant.mrp > selectedVariant.price && (
                        <span className="text-sm text-gray-400 line-through">
                            ₹{selectedVariant.mrp.toLocaleString('en-IN')}
                        </span>
                    )}
                </div>
            </div>

            {/* EMI plan selection comes in Phase 7 */}
        </div>
    );
}