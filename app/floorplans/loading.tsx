export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-stone-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mb-6"></div>
        <h2 className="text-2xl font-light text-stone-900 mb-4 tracking-wide">
          Loading Floor Plans
        </h2>
        <p className="text-stone-600 uppercase tracking-wider text-sm font-light">
          Preparing your luxury experience
        </p>
      </div>
    </div>
  )
}
