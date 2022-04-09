import { Modal } from '../Modal';
import { Row } from '../Board/Row';

const firstExample = [
  {
    char: 't',
    guessed: 2,
    border: false,
  },
  {
    char: 'u',
    guessed: -1,
    border: false,
  },
  {
    char: 'r',
    guessed: 1,
    border: false,
  },
  {
    char: 'n',
    guessed: -1,
    border: false,
  },
  {
    char: 'e',
    guessed: -1,
    border: false,
  },
  {
    char: 'd',
    guessed: -1,
    border: false,
  },
];

const secondExample = [
  {
    char: 't',
    guessed: 2,
    border: false,
  },
  {
    char: 'a',
    guessed: 2,
    border: false,
  },
  {
    char: 'y',
    guessed: 2,
    border: false,
  },
  {
    char: 'l',
    guessed: 2,
    border: false,
  },
  {
    char: 'o',
    guessed: 2,
    border: false,
  },
  {
    char: 'r',
    guessed: 2,
    border: false,
  },
];

export interface HelpProps {
  onClose: () => void;
};

export const Help = (props: HelpProps) => {

  const handleClose = () => {
    props.onClose();
  };

  return (
    <Modal
      title="How to play"
      onClose={handleClose}
    >
      <div className="text-sm">
        <div className="mb-2">
          Complete the row and press enter
        </div>
        <div className="mb-2">
          The color of the squares will change to show how close your guess was to the word, for example
        </div>
        <div className="mb-2">
          <Row row={firstExample} />
        </div>
        <ul className="list-disc list-inside mb-2">
          <li>
            <strong>T</strong> is in the word at the correct spot
          </li>
          <li>
            <strong>R</strong> is in the word but in the wrong spot
          </li>
          <li>
            The rest of letters are not in the word
          </li>
        </ul>
        <div className="mb-2">
          In the next tries use the previous hints to guess the word
        </div>
        <div>
          <Row row={secondExample} />
        </div>
      </div>
    </Modal>
  );
};
