import { FC } from 'react';

export interface ButtonProps {
  bordered?: boolean;
  onClick?: () => void;
}

export const Button: FC<ButtonProps> = (props) => {
  const border = props.bordered ?
    'bg-gray-100 border border-purple-300 mouse:hover:bg-purple-400 mouse:hover:border-purple-400 p-[7px]' :
    'bg-purple-300 mouse:hover:bg-purple-400 p-2';

  const handleClick = () => {
    props.onClick?.();
  };

  return (
    <button
      className={`flex items-center ${border} shadow-md active:scale-90 duration-150 select-none rounded mb-4`}
      onClick={handleClick}
    >
      {props.children}
    </button>
  );
};
