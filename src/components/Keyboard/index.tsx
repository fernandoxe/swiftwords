import { Key } from './Key';

const firstRow = [
  'q',
  'w',
  'e',
  'r',
  't',
  'y',
  'u',
  'i',
  'o',
  'p',
];

const secondRow = [
  'a',
  's',
  'd',
  'f',
  'g',
  'h',
  'j',
  'k',
  'l',
];

const thirdRow = [
  'z',
  'x',
  'c',
  'v',
  'b',
  'n',
  'm',
];

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

  return (
    <div>
      <div className="flex justify-center w-full">
        {firstRow.map((char, index) =>
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
        {secondRow.map((char, index) =>
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
        {thirdRow.map((char, index) =>
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
