import React, { useEffect, useState } from 'react';

interface FloatingOrderAndToastProps {
  toastMessage: string | null;
  onClearToast: () => void;
}

const RECENT_LIVE_ORDERS = [
  'Sofia from Austin got Loaded Fries 🍟 (2m ago)',
  'Liam from Brooklyn ordered Hot Honey Pizza 🍕 (1m ago)',
  'Zoe from Seattle ordered 2x Steamed Momos 🥟 (3m ago)',
  'Marcus from Miami got Monster Chocolate Shake 🥤 (4m ago)',
  'Kai from Austin ordered Nashville Fried Chicken 🍗 (2m ago)',
];

export const FloatingOrderAndToast: React.FC<FloatingOrderAndToastProps> = ({
  toastMessage,
  onClearToast,
}) => {
  const [orderIndex, setOrderIndex] = useState(2); // Starts with Zoe from Seattle as in screenshot!
  const [showLiveOrder, setShowLiveOrder] = useState(true);

  // Cycle live orders periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setOrderIndex((prev) => (prev + 1) % RECENT_LIVE_ORDERS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Toast Notification Popup (Bottom Right) */}
      <div
        className={`fixed bottom-6 right-6 z-50 transform transition-all duration-300 pointer-events-none ${
          toastMessage ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'
        }`}
      >
        <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-[#303033] text-[#f3f0f4] shadow-2xl border border-white/10">
          <span className="material-symbols-outlined text-[#47d6ff]">check_circle</span>
          <span className="font-label-lg text-sm font-bold">{toastMessage}</span>
        </div>
      </div>

      {/* Floating Live Order Notification (Bottom Left) */}
      {showLiveOrder && (
        <div className="hidden sm:flex fixed bottom-6 left-6 z-40 items-center gap-3 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-2xl transition-all duration-500 border border-gray-100">
          <div className="w-10 h-10 rounded-full bg-[#efdbff] flex items-center justify-center text-xl shrink-0">
            🍟
          </div>
          <div className="pr-2">
            <span className="font-label-sticker text-[10px] text-[#b40063] font-bold block uppercase tracking-wider">
              JUST ORDERED
            </span>
            <p className="font-body-sm text-xs text-[#1b1b1e] font-semibold">
              {RECENT_LIVE_ORDERS[orderIndex]}
            </p>
          </div>
          <button
            onClick={() => setShowLiveOrder(false)}
            className="text-gray-400 hover:text-gray-700 p-1 cursor-pointer transition-colors"
            title="Dismiss notification"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}
    </>
  );
};
