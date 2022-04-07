import { keyState } from '../../Board/Square';
import { ReactComponent as SendIcon } from '../../../img/icons/send.svg';
import { ReactComponent as BackspaceIcon } from '../../../img/icons/backspace.svg';

export interface KeyProps {
  char: string;
  large?: boolean;
  disabled?: boolean;
  state?: keyState;
  onClick: () => void;
}

export const Key = (props: KeyProps) => {
  const background = props.state === keyState.INITIAL ?
  'bg-light-background dark:bg-dark-background border-light-border dark:border-dark-border mouse:hover:bg-light-error-200 dark:mouse:hover:bg-dark-error-800 mouse:hover:border-light-error-200 dark:mouse:hover:border-dark-error-800':
  props.state === keyState.ERROR ?
  'bg-light-error-300 dark:bg-dark-error-700 border-light-error-300 dark:border-dark-error-700 mouse:hover:bg-light-error-400 dark:mouse:hover:bg-dark-error-600 mouse:hover:border-light-error-400 dark:mouse:hover:border-dark-error-600' :
  props.state === keyState.ALMOST ?
  'bg-light-warning-300 dark:bg-dark-warning-400 border-light-warning-300 dark:border-dark-warning-400 mouse:hover:bg-light-warning-400 dark:mouse:hover:bg-dark-warning-300 mouse:hover:border-light-warning-400 dark:mouse:hover:border-dark-warning-300  dark:text-dark-contrast' :
  'bg-light-success-500 dark:bg-dark-success-600 border-light-success-500 dark:border-dark-success-600 mouse:hover:bg-light-success-600 dark:mouse:hover:bg-dark-success-500 mouse:hover:border-light-success-600 dark:mouse:hover:border-dark-success-500  dark:text-dark-contrast';

  const largeProps = props.large ?
    'grow-[2] max-w-[4.7rem] bg-light-primary-300 dark:bg-dark-primary-800 border-light-primary-300 dark:border-dark-primary-800 disabled:bg-light-primary-200 dark:disabled:bg-dark-primary-900 disabled:border-light-primary-200 dark:disabled:border-dark-primary-900 disabled:shadow-none mouse:hover:bg-light-primary-400 dark:mouse:hover:bg-dark-primary-700 mouse:hover:border-light-primary-400 dark:mouse:hover:border-dark-primary-700 hover:disabled:bg-light-primary-200 dark:hover:disabled:bg-dark-primary-900 hover:disabled:border-light-primary-200 dark:hover:disabled:border-dark-primary-900' :
    '';

  const additionalProps = props.large ? largeProps : background;

  const disabled = props.disabled ? '' : 'active:scale-90 duration-150';

  const largeDisabled = props.disabled ? 'text-light-disabled-600 dark:text-light-disabled-600' : '';

  return (
    <button
      className={`flex grow items-center justify-center basis-0 h-12 max-w-[3rem] m-1 uppercase border ${additionalProps} [-webkit-tap-highlight-color:transparent] overflow-hidden shadow-md ${disabled} select-none`}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.char === 'enter' &&
        <div className={`w-6 ${largeDisabled}`}>
          <SendIcon />
        </div>
      }
      {props.char === 'delete' &&
        <div className={`w-6 ${largeDisabled}`}>
          <BackspaceIcon/>
        </div>
      }
      {props.char !== 'enter' && props.char !== 'delete' &&
        <>{props.char}</>
      }
    </button>
  );
};
