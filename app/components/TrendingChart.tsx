'use client';

export function TrendingChart() {
  const data = [
    { label: '01', yes: 40, no: 30 },
    { label: '02', yes: 45, no: 35 },
    { label: '03', yes: 35, no: 45 },
    { label: '04', yes: 50, no: 40 },
    { label: '05', yes: 55, no: 35 },
    { label: '06', yes: 45, no: 50 },
    { label: '07', yes: 60, no: 40 },
    { label: '08', yes: 50, no: 45 },
  ];

  const maxValue = Math.max(...data.flatMap(d => [d.yes, d.no]));

  return (
    <div className="bg-surface rounded-lg p-6 border border-white/10 shadow-market">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-fg">Trending Odds</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-positive/20 text-positive px-2 py-1 rounded">Market</span>
        </div>
      </div>

      <div className="relative h-64">
        <div className="absolute inset-0 flex items-end justify-between gap-2">
          {data.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex flex-col gap-1">
                <div
                  className="w-full bg-gradient-to-t from-positive to-positive/60 rounded-t transition-all duration-300 hover:opacity-80"
                  style={{ height: `${(item.yes / maxValue) * 100}%` }}
                ></div>
                <div
                  className="w-full bg-gradient-to-t from-negative to-negative/60 rounded-b transition-all duration-300 hover:opacity-80"
                  style={{ height: `${(item.no / maxValue) * 100}%` }}
                ></div>
              </div>
              <span className="text-xs text-fg/40 mt-2">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-positive"></div>
          <span className="text-sm text-fg/60">YES Shares</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-negative"></div>
          <span className="text-sm text-fg/60">NO Shares</span>
        </div>
      </div>
    </div>
  );
}
