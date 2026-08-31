
import { useEffect } from "react";
const Modal = ({ isOpen, onClose, companyName = "ToolBox", title, message }) => {
  // Close on Escape key press
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
      {/* Backdrop with Blur */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative w-[90%] md:w-[70%] lg:w-140 my-auto mx-auto transition-all duration-300 transform scale-100">
        <div className="relative flex flex-col w-full bg-white border-0 rounded-2xl shadow-2xl outline-none focus:outline-none">
          
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#edfaf4] border-b border-solid border-slate-100 rounded-t">
             <div className="flex text-2xl items-center gap-2 ">
                <h4 className="  font-semibold">Tool<span className="text-[#55828b]">Box</span></h4>
                <h4 className="text-slate-300"> | </h4>
                <h4 className=" font-semibold text-lg text-slate-500 ">
              {title}
            </h4>
             </div>
            <button
              className="p-2 ml-auto bg-transparent border-0 text-slate-400 hover:text-slate-600 transition-colors"
              onClick={onClose}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="relative p-8 flex-auto">
            
            <p className="text-slate-600 text-[1rem] leading-relaxed">
              {message}
            </p>
          </div>

          {/* Footer */}
          {/* <div className="flex items-center justify-end p-6 space-x-4">
            <button
              className="px-6 py-[0.7rem] text-slate-500 font-medium text-[0.9rem] hover:bg-slate-50 rounded-lg transition-all"
              onClick={onClose}
            >
              Dismiss
            </button>
            <button
              className="px-8 py-[0.7rem] bg-indigo-600 text-white font-semibold text-[0.9rem] rounded-lg shadow-md hover:bg-indigo-700 active:scale-95 transition-all"
              onClick={onClose}
            >
              Understand
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export { Modal };