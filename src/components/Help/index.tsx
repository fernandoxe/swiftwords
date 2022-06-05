import { Modal } from '../Modal';
import { Row } from '../Board/Row';
import { Twitter } from '../Twitter';
import { firstExample, secondExample, guessedLetter, almostLetter } from '../../.config';

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
      <div>
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
            <strong>{guessedLetter}</strong> is in the word at the correct spot
          </li>
          <li>
            <strong>{almostLetter}</strong> is in the word but in the wrong spot
          </li>
          <li>
            The rest of letters are not in the word
          </li>
        </ul>
        <div className="mb-2">
          In the next tries use the previous hints to guess the word
        </div>
        <div className="mb-3">
          <Row row={secondExample} />
        </div>
        <div className="text-center mb-2">
          A new {process.env.REACT_APP_TITLE} will be available every day
        </div>
        <div className="text-center">
          <Twitter from="Help" />
        </div>
      </div>
    </Modal>
  );
};
