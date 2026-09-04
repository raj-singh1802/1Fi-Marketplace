import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="space-y-6">
      {/* 1Fi Purple Hero Card */}
      <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        {/* Subtle background glow element */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <span className="text-xs font-semibold tracking-wider uppercase bg-white/20 text-white inline-block px-3 py-1 rounded-full backdrop-blur-sm">
            Limit Available
          </span>
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">₹1,56,091</h2>
            <p className="text-sm text-purple-200 mt-1 font-medium">Remaining to spend</p>
          </div>
          <div className="pt-2">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-white text-purple-700 hover:bg-purple-50 font-bold px-6 py-2.5 rounded-full shadow-md transition-all active:scale-95"
            >
              <span>Shop now</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
