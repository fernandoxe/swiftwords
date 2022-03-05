import { Word } from '../Game';
import { Modal } from '../Modal';
import song from '../../img/icons/song.svg';
import album from '../../img/icons/album.svg';

export interface ResultProps {
  winner: boolean;
  word: Word;
  onClose?: () => void;
}

export const Result = (props: ResultProps) => {

  const handleResultClose = () => {
    props.onClose?.();
  };

  const getMatchedText = (text: string, word: string) => {
    const regexp = new RegExp(`\\b${word}\\b`, 'gi');
    const words = text.split(regexp);
    return (
      <i>
        {words.map((w, i) =>
        <>
          {w}{i !== words.length - 1 ? <strong className="font-normal text-purple-500">{word}</strong> : ''}
        </>
        )}
      </i>
    );
  };

  return (
    <Modal onClose={handleResultClose}>
      <div className="flex flex-col items-center">
        <div className="mb-4 text-center">
          You {props.winner ? 'win! ' : 'lost, '} the word was <span className="text-purple-500">{props.word.word}</span>
        </div>
        <div className="mb-4 text-center">
          {getMatchedText(props.word.line, props.word.word)}
        </div>
        <div className="flex items-center">
          <img src={song} alt="song" className="w-5 mr-1" />{props.word.song}
        </div>
        <div className="flex items-center mb-4">
          <img src={album} alt="album" className="w-5 mr-1" />{props.word.album}
        </div>
      </div>
    </Modal>
  );
};