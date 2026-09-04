export default function ErrorState({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <p className="text-red-500 font-medium mb-2">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-purple-600 text-sm font-semibold underline hover:text-purple-700 cursor-pointer"
        >
          Try again
        </button>
      )}
    </div>
  );
}
