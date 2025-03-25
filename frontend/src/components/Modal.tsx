import React, { FC, ReactNode, useEffect, useState } from "react";
interface Props {
  title?: string;
  buttonText?: string | ReactNode;
  buttonClass?: string;
  modalClass?: string;
  bodyClass?: string;
  isOpen?: boolean;
  children?: string | ReactNode;
  onToggleClose?: Function;
  onToggleOpen?: Function;
}

/**
 *
 * Modal
 *
 */
const Modal: FC<Props> = ({
  title,
  buttonText,
  buttonClass = "btn btn-sm btn-default",
  modalClass = "",
  bodyClass = "",
  isOpen = false,
  children,
  onToggleClose,
  onToggleOpen,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  /**
   *
   * Update open state when isOpen prop updates
   *
   */
  useEffect(() => setOpen(() => isOpen), [isOpen]);

  const onModalOpen = () => {
    setOpen(() => true);

    if (onToggleOpen) {
      onToggleOpen();
    }
  };

  const onModalClose = () => {
    setOpen(() => false);

    if (onToggleClose) {
      onToggleClose();
    }
  };

  return (
    <>
      {buttonText && (
        <button className={buttonClass} onClick={onModalOpen}>
          {buttonText}
        </button>
      )}

      {open && (
        <div className="fixed flex flex-col inset-0 z-50" tabIndex={-1}>
          <div
            className="fixed flex flex-col p-4 h-full w-full bg-white 
              bg-opacity-60 z-10"
            onClick={onModalClose}
          ></div>

          <div className="block max-w-2xl w-full m-auto p-4">
            <div
              className={`flex flex-col relative border border-gray-300 shadow-md 
                rounded overflow-hidden z-20 ${modalClass}`}
            >
              <div className="flex px-4 py-3 items-center relative bg-gray-200">
                <h4 className="flex flex-1 font-bold">{title}</h4>
                <button
                  type="button"
                  title="Close"
                  className="flex px-4 py-2 absolute text-lg right-0 cursor-pointer"
                  onClick={onModalClose}
                >
                  &times;
                </button>
              </div>

              <div
                className={`flex flex-col w-full min-h-[16em] max-h-[80vh] p-4 bg-white 
                  overflow-auto ${bodyClass}`}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
