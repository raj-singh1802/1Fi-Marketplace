import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductBySlug } from '../api/products';
import VariantSelector from '../components/VariantSelector';
import EMIPlanList from '../components/EMIPlanList';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

export default function ProductDetail() {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState('loading');
    const [selectedVariantId, setSelectedVariantId] = useState(null);
    const [selectedPlanId, setSelectedPlanId] = useState(null);
    const [proceeded, setProceeded] = useState(false);

    const loadProduct = useCallback(() => {
        setStatus('loading');
        fetchProductBySlug(slug)
            .then((data) => {
                if (!data) {
                    setStatus('not-found');
                    return;
                }
                setProduct(data);
                const firstVariant = data.variants[0];
                setSelectedVariantId(firstVariant?.id ?? null);
                setSelectedPlanId(firstVariant?.emiPlans?.[0]?.id ?? null);
                setStatus('success');
            })
            .catch(() => setStatus('error'));
    }, [slug]);

    useEffect(() => {
        loadProduct();
    }, [loadProduct]);

    function handleVariantSelect(variantId) {
        setSelectedVariantId(variantId);
        setProceeded(false);
        const variant = product.variants.find((v) => v.id === variantId);
        setSelectedPlanId(variant?.emiPlans?.[0]?.id ?? null);
    }

    function handlePlanSelect(planId) {
        setSelectedPlanId(planId);
        setProceeded(false);
    }

    if (status === 'loading') return <LoadingState label="Loading product..." />;
    if (status === 'error') {
        return <ErrorState message="Couldn't load this product." onRetry={loadProduct} />;
    }
    if (status === 'not-found') {
        return <p className="text-center text-gray-400 py-20">Product not found.</p>;
    }

    const selectedVariant = product.variants.find((v) => v.id === selectedVariantId);
    const selectedPlan = selectedVariant?.emiPlans.find((p) => p.id === selectedPlanId);

    if (proceeded) {
        return (
            <div className="max-w-md mx-auto text-center py-20 space-y-3">
                <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto text-2xl">
                    ✓
                </div>
                <h2 className="text-xl font-bold text-gray-900">Plan confirmed</h2>
                <p className="text-gray-500 text-sm">
                    {product.name} ({selectedVariant.label}) — {selectedPlan.tenureMonths} months at
                    ₹{selectedPlan.monthlyAmount.toLocaleString('en-IN')}/mo
                </p>
                <button
                    onClick={() => setProceeded(false)}
                    className="text-purple-600 text-sm font-semibold underline"
                >
                    Back to plan selection
                </button>
            </div>
        );
    }

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
                    onSelect={handleVariantSelect}
                />
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
                <div>
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

                <EMIPlanList
                    plans={selectedVariant.emiPlans}
                    selectedPlanId={selectedPlanId}
                    onSelect={handlePlanSelect}
                />
            </div>

            {selectedPlan && (
                <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-400">Selected plan</p>
                        <p className="font-semibold text-gray-800">
                            {selectedPlan.tenureMonths} months · ₹{selectedPlan.monthlyAmount.toLocaleString('en-IN')}/mo
                        </p>
                    </div>
                    <button
                        onClick={() => setProceeded(true)}
                        className="bg-purple-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-purple-700 transition"
                    >
                        Proceed
                    </button>
                </div>
            )}
        </div>
    );
}