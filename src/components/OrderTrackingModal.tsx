import React, { useState, useEffect } from 'react';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  showToast: (msg: string) => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  showToast,
}) => {
  const [etaMinutes, setEtaMinutes] = useState(18);
  const [progress, setProgress] = useState(25); // percentage

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 95 ? prev + 1 : prev));
      if (Math.random() > 0.7) {
        setEtaMinutes((prev) => (prev > 5 ? prev - 1 : 4));
      }
    }, 2000);
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

      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-gray-100 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-6 bg-[#303033] text-white flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#e1037d] text-white font-label-sticker text-[10px] font-bold uppercase mb-1">
              ⚡ HYPER SPEED DISPATCH
            </div>
            <h2 className="font-headline-sm text-xl font-bold">Order #BZ-8829 Live Tracking</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* ETA Card */}
          <div className="p-4 rounded-2xl bg-[#efdbff] text-[#2b0052] flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider block">Estimated Drop In</span>
              <span className="text-3xl font-extrabold font-mono text-[#7d2dce]">{etaMinutes} MINS</span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold block">Kitchen Status:</span>
              <span className="text-xs font-bold text-emerald-600">Fresh Off The Grill 🔥</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="w-full bg-[#f0edf1] rounded-full h-3 overflow-hidden p-0.5">
              <div
                className="bg-gradient-to-r from-[#b40063] via-[#7d2dce] to-[#00657b] h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[11px] text-gray-500 font-bold">
              <span className="text-[#b40063]">1. Kitchen Firing 🔥</span>
              <span className={progress >= 50 ? 'text-[#7d2dce]' : ''}>2. Runner Dispatched 🛵</span>
              <span className={progress >= 85 ? 'text-[#00657b]' : ''}>3. At Your Door 🚪</span>
            </div>
          </div>

          {/* Simulated Map Graphic */}
          <div className="relative h-44 rounded-2xl bg-[#f0edf1] overflow-hidden border border-gray-200 flex items-center justify-center">
            {/* Grid street lines */}
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#b40063_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className="absolute w-3/4 h-0.5 bg-dashed bg-gradient-to-r from-[#b40063] to-[#00657b]"></div>

            {/* Courier pin */}
            <div className="absolute left-1/3 transform -translate-x-1/2 flex flex-col items-center">
              <span className="text-2xl animate-bounce">🛵</span>
              <span className="px-2 py-0.5 bg-[#303033] text-white text-[9px] rounded-full font-bold">
                Alex (18 mph)
              </span>
            </div>

            {/* Destination pin */}
            <div className="absolute right-12 transform -translate-x-1/2 flex flex-col items-center">
              <span className="text-2xl">📍</span>
              <span className="px-2 py-0.5 bg-[#b40063] text-white text-[9px] rounded-full font-bold">
                Your Door (Apt 4B)
              </span>
            </div>
          </div>

          {/* Driver Contact Box */}
          <div className="p-3 rounded-2xl bg-[#f6f2f7] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#ffd9e3] text-lg flex items-center justify-center font-bold">
                ⚡
              </div>
              <div>
                <h4 className="font-bold text-xs text-gray-800">Alex Rider (BiteBuzz Runner #44)</h4>
                <p className="text-[11px] text-gray-500">★ 4.9 • 1,420 rapid drops</p>
              </div>
            </div>
            <button
              onClick={() => showToast('Calling courier Alex Rider... 📞')}
              className="px-3 py-1.5 rounded-full bg-[#303033] text-white text-xs font-bold hover:bg-black cursor-pointer"
            >
              Call Runner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
