import { modal } from "@/store/modal";
import { X } from "lucide-react";

const Modal = ({ children }) => {
  const { modalOpen, setModalOpen, modalContent, modalConfig } = modal();

  if (!modalOpen) return null;

  const handleOverlayClick = (e) => {
    e.stopPropagation();
  };

  if (modalOpen)
    return (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center rounded-xl`}
      >
        <div className="fixed inset-0 bg-black/50" />

        {/* Modal Content */}
        <div
          onClick={handleOverlayClick}
          className={`
            relative z-50 w-full mx-4 bg-white rounded-lg shadow-lg
            ${modalConfig.classname || ""}
            ${modalConfig.width ? `w-[${modalConfig.width}px]` : "w-fit"}
            ${modalConfig.height ? `h-[${modalConfig.height}px]` : "h-fit"}
          `}
        >
          {/* Header dengan background image */}
          {modalConfig.withHeader && (
            <div
              className="relative w-full h-[70px] rounded-t-lg overflow-hidden"
              style={{
                backgroundImage: "url(/img/headermodal386.svg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              {/* Tombol close di pojok kanan atas header */}
              {modalConfig.withClose && (
                <button
                  onClick={() => setModalOpen(false)}
                  className="absolute right-2 top-2 p-1 w-fit bg-white rounded-full transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-3 h-3 text-error-500" />
                </button>
              )}
            </div>
          )}

          {!modalConfig.withHeader && modalConfig.withClose && (
            <button
              onClick={() => setModalOpen(false)}
              className="p-1 rounded-full transition-colors absolute right-3 top-2"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-primary-700 " />
            </button>
          )}

          {/* Body */}
          {modalContent !== null ? modalContent : children}
        </div>
      </div>
    );
};

export default Modal;
