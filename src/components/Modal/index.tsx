import { FC } from 'react';
import close from '../../img/icons/close.svg';
import { gtm } from '../../services/gtm';

export interface ModalProps {
  title?: string;
  onClose?: () => void;
}

export const Modal:FC<ModalProps> = (props) => {

  const handleClick = (x: boolean) => {
    gtm.closeModal(x);
    props.onClose?.();
  };

  return (
    <div onClick={() => handleClick(false)} className="fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-30 overflow-y-auto">
      <div className="flex items-center justify-center p-4 min-h-screen">
        <div onClick={(e) => e.stopPropagation()} className="w-[94%] max-w-xl rounded-lg p-4 bg-gray-100 shadow-md">
          <div className="flex justify-between mb-2">
            <div className="font-bold text-lg">
              {props.title}
            </div>
            <button onClick={() => handleClick(true)} className="[-webkit-tap-highlight-color:transparent] outline-none">
              <img src={close} alt="close" />
            </button>
          </div>
          <div>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};
