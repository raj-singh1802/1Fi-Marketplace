import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="p-8 min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
      <div className="text-purple-600 font-bold text-3xl">Tailwind works</div>
      <button 
        onClick={() => setCount((c) => c + 1)}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors cursor-pointer"
      >
        Count is {count}
      </button>
    </div>
  )
}

export default App
