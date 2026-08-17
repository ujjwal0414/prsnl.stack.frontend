import React from 'react'
import { Link } from 'react-router'
import { ShieldAlert, ArrowRight, Home } from 'lucide-react'

function UnAuth() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-[#E7EEE9] px-[4vw] relative overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600&display=swap');
        .heading-font { font-family: 'Poppins', ui-sans-serif, system-ui; }
      `}</style>

      {/* soft ambient glow, warm rather than teal — signals "stop", not routine loading */}
      <div className="absolute w-[42vh] h-[42vh] rounded-full bg-[#C0562C]/8 blur-3xl" />

      <div className="relative bg-white border border-[#D8E1DB] rounded-2xl shadow-[0_0.6vh_2.4vh_rgba(31,45,42,0.08)] px-[4vw] py-[5vh] max-w-[36vw] min-w-[320px] flex flex-col items-center text-center">
        <div className="w-[9vh] h-[9vh] rounded-2xl bg-[#FBEDE7] flex items-center justify-center mb-[2.6vh]">
          <img
            src="/unauth.svg"
            alt=""
            className="w-[6vh] h-[6vh] object-contain"
            onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'flex'; }}
          />
          <ShieldAlert size={30} className="text-[#C0562C] hidden" strokeWidth={2} />
        </div>

        <h1 className="heading-font text-[#1F2D2A] text-[clamp(20px,2vw,26px)] font-bold">
          Access denied
        </h1>
        <p className="text-[#6B7B75] text-[clamp(13px,0.95vw,15px)] mt-[1vh] leading-relaxed">
          You're not authorized to view this page. Log in with an account
          that has access, or head back to somewhere you belong.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-[1.2vh] sm:gap-[1vw] mt-[3.2vh] w-full sm:w-auto">
          <Link
            to="/login"
            className="heading-font w-full sm:w-auto flex items-center justify-center gap-[0.5vw] bg-[#20343A] hover:bg-[#182A2E] text-white px-[2vw] py-[1.4vh] rounded-xl text-[clamp(13px,0.9vw,14px)] font-semibold transition-colors"
          >
            Log in
            <ArrowRight size={16} />
          </Link>
          <Link
            to="/"
            className="w-full sm:w-auto flex items-center justify-center gap-[0.5vw] text-[#5C8B93] hover:text-[#20343A] px-[2vw] py-[1.4vh] text-[clamp(13px,0.9vw,14px)] font-semibold transition-colors"
          >
            <Home size={16} />
            Go home
          </Link>
        </div>
      </div>
    </div>
  )
}

export { UnAuth }