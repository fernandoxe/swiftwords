// import { useCallback, useEffect } from 'react';
import { FIRST_ROW, SECOND_ROW, THIRD_ROW } from '../../constants';
import { Key } from './Key';

export interface KeyStates {
  [key: string]: -1 | 0 | 1 | 2;
}

export interface KeyboardProps {
  onKeyClick: (char: string) => void;
  onEnterClick: () => void;
  onDeleteClick: () => void;
  enterDisabled: boolean;
  deleteDisabled: boolean;
  keyStates: KeyStates;
  keyBoardDisabled: boolean;
}

export const Keyboard = (props: KeyboardProps) => {

  // const handle = useCallback((char: string) => {
  //   console.log('render usecallback');
  //   if(props.keyBoardDisabled) {
  //     return;
  //   }
  //   if(char === 'enter') {
  //     props.onEnterClick();
  //     return;
  //   }
  //   if(char === 'delete') {
  //     props.onDeleteClick();
  //     return;
  //   }
  //   props.onKeyClick(char);
  // }, [props]);

  const handleKeyClick = (char: string) => {
    if(props.keyBoardDisabled) {
      return;
    }
    if(char === 'enter') {
      props.onEnterClick();
      return;
    }
    if(char === 'delete') {
      props.onDeleteClick();
      return;
    }
    props.onKeyClick(char);
  };

  // useEffect(() => {
  //   const keyup = (e: KeyboardEvent) => {
  //     if(e.key === 'Enter') {
  //       console.log('key enter', e.key);
  //       handle('enter');
  //     } else if(e.key === 'Backspace') {
  //       console.log('key delete', e.key);
  //       handle('delete');
  //     } else if(e.key.length === 1 && e.key.toLowerCase() >= 'a' && e.key.toLowerCase() <= 'z') {
  //       console.log('key char', e.key);
  //       handle(e.key);
  //     }
  //   };

  //   document.addEventListener('keyup', keyup);

  //   return () => {
  //     document.removeEventListener('keyup', keyup);
  //   };
  // }, [handle]);

  return (
    <div>
      <div className="flex justify-center w-full">
        {FIRST_ROW.map((char, index) =>
          <Key
            key={index}
            char={char}
            state={props.keyStates[char]}
            onClick={() => handleKeyClick(char)}
          />
        )}
      </div>
      <div className="flex justify-center">
        <div className="flex grow-[0.5]"></div>
        {SECOND_ROW.map((char, index) =>
          <Key
            key={index}
            char={char}
            state={props.keyStates[char]}
            onClick={() => handleKeyClick(char)}
          />
        )}
        <div className="flex grow-[0.5]"></div>
      </div>
      <div className="flex justify-center">
        <Key
          char="enter"
          large
          state={0}
          disabled={props.enterDisabled}
          onClick={() => handleKeyClick('enter')}
        />
        {THIRD_ROW.map((char, index) =>
          <Key
            key={index}
            char={char}
            state={props.keyStates[char]}
            onClick={() => handleKeyClick(char)}
          />
        )}
        <Key
          char="delete"
          large
          disabled={props.deleteDisabled}
          state={0}
          onClick={() => handleKeyClick('delete')}
        />
      </div>
    </div>
  );
};
