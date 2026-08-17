import React from 'react'

function Loading() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-[#E7EEE9] relative overflow-hidden">
      <style>{`
        .heading-font { font-family: 'Poppins', ui-sans-serif, system-ui; }

        @keyframes tb-ring-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes tb-pulse {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.06); }
        }
        @keyframes tb-dot {
          0%, 80%, 100% { opacity: 0.25; transform: translateY(0); }
          40% { opacity: 1; transform: translateY(-3px); }
        }
        .tb-ring {
          animation: tb-ring-spin 1s linear infinite;
        }
        .tb-glow {
          animation: tb-pulse 2.4s ease-in-out infinite;
        }
        .tb-dot { animation: tb-dot 1.2s ease-in-out infinite; }
        .tb-dot:nth-child(2) { animation-delay: 0.15s; }
        .tb-dot:nth-child(3) { animation-delay: 0.3s; }
      `}</style>

      {/* soft ambient glow behind the mark */}
      <div className="tb-glow absolute w-[38vh] h-[38vh] rounded-full bg-[#55828b]/10 blur-3xl" />

      {/* spinner ring wrapping a centered mark */}
      <div className="relative flex items-center justify-center w-[9vh] h-[9vh] mb-[3.2vh]">
        <svg className="tb-ring absolute inset-0 w-full h-full" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="42" stroke="#D8E1DB" strokeWidth="7" />
          <circle
            cx="50"
            cy="50"
            r="42"
            stroke="#55828b"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray="264"
            strokeDashoffset="190"
          />
        </svg>
        <div className="w-[4.4vh] h-[4.4vh] rounded-xl bg-[#20343A] flex items-center justify-center">
          <span className="heading-font text-white text-[clamp(14px,1.6vh,20px)] font-bold">T</span>
        </div>
      </div>

      <p
        className="heading-font text-[clamp(22px,3vh,34px)] font-bold text-[#1F2D2A] tracking-tight"
        style={{ fontFamily: "'Inter', ui-sans-serif, system-ui" }}
      >
        <span className="heading-font font-bold">Tool</span>
        <span className="heading-font font-bold text-[#55828b]">Box</span>
      </p>

      <div className="flex items-center gap-[0.4vh] mt-[1.4vh]">
        <span className="text-[#6B7B75] text-[clamp(12px,1.6vh,14px)] font-medium">
          Getting things ready
        </span>
        <span className="flex items-end gap-0.75 ml-0.5">
          <span className="tb-dot w-1 h-1 rounded-full bg-[#6B7B75]" />
          <span className="tb-dot w-1 h-1 rounded-full bg-[#6B7B75]" />
          <span className="tb-dot w-1 h-1 rounded-full bg-[#6B7B75]" />
        </span>
      </div>
    </div>
  )
}

export { Loading }