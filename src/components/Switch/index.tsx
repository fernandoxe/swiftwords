import { ChangeEvent } from 'react';

export interface SwitchProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Switch = (props: SwitchProps) => {

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.onChange(event.target.checked);
  };

  return (
    <>
      <input
        className="hidden peer"
        type="checkbox"
        name="dark"
        id={props.id}
        checked={props.checked}
        onChange={handleChange}
      />
      <label
        className="block relative w-12 h-6 rounded-full cursor-pointer bg-light-error-300 transition-all duration-[600] after:bg-light-primary-300 dark:after:bg-dark-primary-800 after:mouse:hover:bg-light-primary-400 dark:after:mouse:hover:bg-dark-primary-700 after:w-5 after:h-5 after:rounded-full after:absolute after:top-0.5 after:left-0.5 after:transition-all peer-checked:bg-dark-success-600 peer-checked:after:left-[calc(100%-0.125rem)] peer-checked:after:translate-x-[-100%]"
        htmlFor={props.id}
      ></label>
    </>
  );
};