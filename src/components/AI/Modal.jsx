import { modal } from "@/store/AI/modal";

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
          relative z-50 w-full max-w-lg mx-4 bg-white rounded-lg shadow-lg
          !w-[${modalConfig.width}px] !h-[${modalConfig.height}px]
        `}
        >
          {/* Header */}
          {modalConfig.withHeader && (
            <div className="flex items-center justify-between p-4 border-b">
              {modalConfig.withClose && (
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close modal"
                >
                  {/* <X className="w-5 h-5 text-gray-500" /> */}x
                </button>
              )}
            </div>
          )}

          {/* Body */}
          {modalContent !== null ? modalContent : children}
        </div>
      </div>
    );
};

export default Modal;
