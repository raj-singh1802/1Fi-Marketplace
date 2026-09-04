export default function LoadingState({ label = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
      <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-3" />
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
}
