import React, { useState, useEffect } from 'react';

interface DropRadarModalProps {
  isOpen: boolean;
  onClose: () => void;
  showToast: (msg: string) => void;
}

export const DropRadarModal: React.FC<DropRadarModalProps> = ({
  isOpen,
  onClose,
  showToast,
}) => {
  const [activeDriverCount, setActiveDriverCount] = useState(947);
  const [radarPings, setRadarPings] = useState([
    { id: 1, x: 38, y: 45, label: 'Burger Smash Van #4' },
    { id: 2, x: 62, y: 28, label: 'Speed Drone #12' },
    { id: 3, x: 75, y: 68, label: 'Boba Moto Runner #88' },
    { id: 4, x: 22, y: 72, label: 'Taco Dispatcher #09' },
  ]);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setActiveDriverCount((prev) => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 2500);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
      />

      <div className="relative w-full max-w-xl bg-[#1b1b1e] text-[#f3f0f4] rounded-3xl shadow-2xl overflow-hidden z-10 border border-[#00657b]/40 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🛸</span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-headline-md text-xl font-bold text-white">
                  Live Drop Radar
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#007f9b] text-white font-label-sticker text-[10px] font-bold animate-pulse">
                  LIVE SATELLITE
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Real-time active kitchen dispatchers &amp; speed courier fleet
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Radar Screen Visual */}
          <div className="relative w-full h-64 bg-[#0a0a0f] rounded-2xl overflow-hidden border border-[#00657b]/30 flex items-center justify-center">
            {/* Concentric Radar Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 rounded-full border border-[#007f9b]/40"></div>
              <div className="w-36 h-36 rounded-full border border-[#007f9b]/30"></div>
              <div className="w-56 h-56 rounded-full border border-[#007f9b]/20"></div>
              {/* Crosshair lines */}
              <div className="absolute w-full h-px bg-[#007f9b]/20"></div>
              <div className="absolute h-full w-px bg-[#007f9b]/20"></div>
            </div>

            {/* Sweep radar beam */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#00d2ff]/10 to-transparent pointer-events-none animate-spin origin-center duration-3000"></div>

            {/* Simulated Live Drop Pings */}
            {radarPings.map((ping) => (
              <div
                key={ping.id}
                style={{ top: `${ping.y}%`, left: `${ping.x}%` }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                onClick={() => showToast(`Tracking ${ping.label} (Speed: 28 mph) ⚡`)}
              >
                <div className="w-3.5 h-3.5 rounded-full bg-[#00d2ff] animate-ping opacity-75"></div>
                <div className="w-3 h-3 rounded-full bg-[#00d2ff] -mt-3.5 border-2 border-white shadow-md"></div>
                <span className="absolute left-4 -top-1 bg-black/80 text-[10px] text-[#b6ebff] px-1.5 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {ping.label}
                </span>
              </div>
            ))}

            {/* Radar Center Status */}
            <div className="relative z-10 text-center pointer-events-none">
              <span className="text-xs font-mono text-[#47d6ff] font-bold">
                GRID #LA-METRO-04
              </span>
              <p className="text-[10px] text-gray-400">Pinging every 1.2s</p>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
              <span className="text-xl font-bold font-mono text-[#47d6ff] block">
                {activeDriverCount}
              </span>
              <span className="text-[10px] text-gray-400 font-bold uppercase">
                Active Couriers
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
              <span className="text-xl font-bold font-mono text-[#ffb0c9] block">
                18m
              </span>
              <span className="text-[10px] text-gray-400 font-bold uppercase">
                Avg Drop Time
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
              <span className="text-xl font-bold font-mono text-emerald-400 block">
                42
              </span>
              <span className="text-[10px] text-gray-400 font-bold uppercase">
                Ghost Kitchens
              </span>
            </div>
          </div>

          {/* Hot Drop Zones */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
              Zone Demand Status
            </span>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 text-xs">
                <span className="font-semibold text-white">Downtown Arts District</span>
                <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 font-bold text-[10px]">
                  🔥 ULTRA HIGH (120+ orders/hr)
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 text-xs">
                <span className="font-semibold text-white">University Campus Zone</span>
                <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold text-[10px]">
                  ⚡ HEAVY DEMAND (85 orders/hr)
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 text-xs">
                <span className="font-semibold text-white">Westside Night Walk</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                  🟢 RAPID DISPATCH (Under 15 mins)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
