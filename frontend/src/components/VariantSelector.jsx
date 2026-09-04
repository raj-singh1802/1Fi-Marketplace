export default function VariantSelector({ variants, selectedVariantId, onSelect }) {
    return (
        <div className="space-y-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Select your variant
            </p>
            {variants.map((variant) => {
                const isSelected = variant.id === selectedVariantId;
                return (
                    <button
                        key={variant.id}
                        onClick={() => onSelect(variant.id)}
                        className={`w-full flex items-center justify-between rounded-xl border px-4 py-3 text-left transition ${isSelected
                                ? 'border-purple-600 bg-purple-50'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <span
                                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-purple-600' : 'border-gray-300'
                                    }`}
                            >
                                {isSelected && <span className="w-2 h-2 rounded-full bg-purple-600" />}
                            </span>
                            <span className="font-medium text-gray-800">{variant.label}</span>
                        </div>
                        <span className="font-bold text-gray-900">
                            ₹{variant.price.toLocaleString('en-IN')}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}