import { useCallback, useEffect } from 'react';
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

export const Keyboard = ({
  onKeyClick,
  onEnterClick,
  onDeleteClick,
  enterDisabled,
  deleteDisabled,
  keyStates,
  keyBoardDisabled,
}: KeyboardProps) => {

  const handleKeyClick = useCallback((char: string) => {
    if(keyBoardDisabled) {
      return;
    }
    if(char === 'enter') {
      onEnterClick();
      return;
    }
    if(char === 'delete') {
      onDeleteClick();
      return;
    }
    onKeyClick(char);
  }, [keyBoardDisabled, onDeleteClick, onEnterClick, onKeyClick]);

  useEffect(() => {
    const keyup = (e: KeyboardEvent) => {
      // console.log('key', e.key)
      if(e.key === 'Enter' && !enterDisabled) {
        // console.log('key enter', e.key);
        handleKeyClick('enter');
      } else if(e.key === 'Backspace' && !deleteDisabled) {
        // console.log('key delete', e.key);
        handleKeyClick('delete');
      } else if(e.key.length === 1 && e.key.toLowerCase() >= 'a' && e.key.toLowerCase() <= 'z') {
        // console.log('key char', e.key);
        handleKeyClick(e.key);
      }
    };

    document.addEventListener('keyup', keyup);
    // console.log('add keyup');

    return () => {
      document.removeEventListener('keyup', keyup);
      // console.log('remove keyup');
    };
  }, [handleKeyClick, enterDisabled, deleteDisabled]);

  return (
    <>
      <div className="flex justify-center w-full">
        {FIRST_ROW.map((char, index) =>
          <Key
            key={index}
            char={char}
            state={keyStates[char]}
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
            state={keyStates[char]}
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
          disabled={enterDisabled}
          onClick={() => handleKeyClick('enter')}
        />
        {THIRD_ROW.map((char, index) =>
          <Key
            key={index}
            char={char}
            state={keyStates[char]}
            onClick={() => handleKeyClick(char)}
          />
        )}
        <Key
          char="delete"
          large
          disabled={deleteDisabled}
          state={0}
          onClick={() => handleKeyClick('delete')}
        />
      </div>
    </>
  );
};
