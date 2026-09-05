export default function EMIPlanCard({ plan, isSelected, onSelect }) {
    return (
        <button
            onClick={() => onSelect(plan.id)}
            className={`w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 rounded-xl border px-4 py-3 text-left transition ${isSelected
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
        >
            <div className="flex items-center gap-3">
                <span
                    className={`w-4 h-4 shrink-0 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-purple-600' : 'border-gray-300'
                        }`}
                >
                    {isSelected && <span className="w-2 h-2 rounded-full bg-purple-600" />}
                </span>
                <div>
                    <p className="font-medium text-gray-800">
                        {plan.tenureMonths} months · {plan.interestRate}% p.a.
                    </p>
                    {plan.cashback ? (
                        <p className="text-xs text-green-600">
                            Additional cashback of ₹{plan.cashback.toLocaleString('en-IN')}
                        </p>
                    ) : null}
                </div>
            </div>
            <span className="font-bold text-gray-900 pl-7 sm:pl-0">
                ₹{plan.monthlyAmount.toLocaleString('en-IN')}
                <span className="text-xs font-normal text-gray-400">/mo</span>
            </span>
        </button>
    );
}