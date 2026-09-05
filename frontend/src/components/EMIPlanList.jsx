import EMIPlanCard from './EMIPlanCard';

export default function EMIPlanList({ plans, selectedPlanId, onSelect }) {
    if (!plans || plans.length === 0) {
        return <p className="text-sm text-gray-400">No EMI plans available for this variant.</p>;
    }

    return (
        <div className="space-y-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                EMI plans backed by mutual funds
            </p>
            {plans.map((plan) => (
                <EMIPlanCard
                    key={plan.id}
                    plan={plan}
                    isSelected={plan.id === selectedPlanId}
                    onSelect={onSelect}
                />
            ))}
        </div>
    );
}