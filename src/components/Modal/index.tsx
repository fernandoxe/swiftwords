import { FC } from 'react';
import { ReactComponent as CloseIcon } from '../../img/icons/close.svg';
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
    <div onClick={() => handleClick(false)} className="fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-30 dark:bg-opacity-70 overflow-y-auto">
      <div className="flex items-center justify-center p-4 min-h-screen">
        <div onClick={(e) => e.stopPropagation()} className="w-[94%] max-w-md rounded-lg p-4 bg-light-background dark:bg-dark-background shadow-md">
          <div className="flex justify-between mb-2">
            <div className="font-bold text-xl">
              {props.title}
            </div>
            <button onClick={() => handleClick(true)} className="w-7 [-webkit-tap-highlight-color:transparent] active:scale-90 duration-150 select-none">
              <CloseIcon />
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
