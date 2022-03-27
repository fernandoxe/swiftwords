import { keyState } from '../../Board/Square';
import send from '../../../img/icons/send.svg';
import backspace from '../../../img/icons/backspace.svg';
import sendDisabled from '../../../img/icons/send-disabled.svg';
import backspaceDisabled from '../../../img/icons/backspace-disabled.svg';

export interface KeyProps {
  char: string;
  large?: boolean;
  disabled?: boolean;
  state?: keyState;
  onClick: () => void;
}

export const Key = (props: KeyProps) => {
  const background = props.state === keyState.INITIAL ?
  'bg-slate-100 border-slate-200 mouse:hover:bg-slate-200 mouse:hover:border-slate-200':
  props.state === keyState.ERROR ?
  'bg-slate-300 border-slate-300 mouse:hover:bg-slate-400 mouse:hover:border-slate-400 ' :
  props.state === keyState.ALMOST ?
  'bg-yellow-300 border-yellow-300 mouse:hover:bg-yellow-400 mouse:hover:border-yellow-400 ' :
  'bg-green-500 border-green-500 mouse:hover:bg-green-600 mouse:hover:border-green-600 ';

  const largeProps = props.large ?
    'grow-[2] max-w-[4.7rem] bg-purple-300 border-purple-300 disabled:bg-purple-200 disabled:border-purple-200 disabled:text-slate-400 disabled:shadow-none mouse:hover:bg-purple-400 mouse:hover:border-purple-400 hover:disabled:bg-purple-200 hover:disabled:border-purple-200' :
    '';

  const additionalProps = props.large ? largeProps : background;

  return (
    <button
      className={`flex grow items-center justify-center basis-0 h-12 max-w-[3rem] m-1 uppercase border ${additionalProps} [-webkit-tap-highlight-color:transparent] overflow-hidden shadow-md active:scale-90 duration-150 select-none`}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.char === 'enter' &&
        <img src={props.disabled ? sendDisabled : send} alt="enter" />
      }
      {props.char === 'delete' &&
        <img src={props.disabled ? backspaceDisabled : backspace} alt="delete" />
      }
      {props.char !== 'enter' && props.char !== 'delete' &&
        <>{props.char}</>
      }
    </button>
  );
};
