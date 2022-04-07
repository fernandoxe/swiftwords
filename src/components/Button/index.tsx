import { FC } from 'react';

export interface ButtonProps {
  bordered?: boolean;
  onClick?: () => void;
}

export const Button: FC<ButtonProps> = (props) => {
  const border = props.bordered ?
    'bg-light-background dark:bg-dark-background border border-light-primary-300 dark:border-dark-primary-800 mouse:hover:bg-light-primary-400 dark:mouse:hover:bg-dark-primary-700 mouse:hover:border-light-primary-400 dark:mouse:hover:border-dark-primary-700 p-[7px]' :
    'bg-light-primary-300 dark:bg-dark-primary-800 mouse:hover:bg-light-primary-400 dark:mouse:hover:bg-dark-primary-700 p-2';

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
