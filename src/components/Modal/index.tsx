import { FC } from 'react';
import close from '../../img/icons/close.svg';

export interface ModalProps {
  onClose?: () => void;
}

export const Modal:FC<ModalProps> = (props) => {

  const handleClick = () => {
    props.onClose?.();
  };

  return (
    <div onClick={handleClick} className="fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-30 overflow-y-auto">
      <div className="flex items-center justify-center p-4 min-h-screen">
        <div onClick={(e) => e.stopPropagation()} className="w-4/5 max-w-xl rounded-lg p-4 bg-white">
          <div className="flex justify-end">
            <button onClick={handleClick} className="[-webkit-tap-highlight-color:transparent] outline-none">
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
