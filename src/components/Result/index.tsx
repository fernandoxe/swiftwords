import { Word } from '../Game';
import { Modal } from '../Modal';
import song from '../../img/icons/song.svg';
import album from '../../img/icons/album.svg';
import share from '../../img/icons/share.svg';
import { Fragment } from 'react';

export interface ResultProps {
  winner: boolean;
  word: Word;
  emojisBoard: string[][];
  attempts: number;
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
      words.map((w, i) =>
      <Fragment key={i}>
        {w}{i !== words.length - 1 ? <strong className="font-normal text-purple-500">{word}</strong> : ''}
      </Fragment>
      )
    );
  };

  const emojisBoardToString = () => {
    const emojisBoardString = props.emojisBoard
      .map(row => row.map(square => square).join('')).join('\n');
    return emojisBoardString;
  };

  const handleShareClick = async () => {
    try {
      await navigator.share({
        text: `Swiftdle #1 - ${props.word.word.length} letters\n${props.emojisBoard.length}/${props.attempts} attempts\n${emojisBoardToString()}\n`,
        title: process.env.REACT_APP_TITLE,
        url: process.env.REACT_APP_URL,
      });

      console.log('Share successful');
    } catch (error: any) {
      console.log('Share error', error.message);
    }
  };

  return (
    <Modal onClose={handleResultClose}>
      <div className="flex flex-col items-center">
        <div className="mb-4 text-center">
          You {props.winner ? 'win! ' : 'lost, '} the word was <span className="text-purple-500">{props.word.word}</span>
        </div>
        <div className="mb-4 text-center">
          <i>
            {getMatchedText(props.word.line, props.word.word)}
          </i>
        </div>
        <div className="flex items-center">
          <img src={song} alt="song" className="w-5 mr-1" />{props.word.song}
        </div>
        <div className="flex items-center mb-4">
          <img src={album} alt="album" className="w-5 mr-1" />{props.word.album}
        </div>
        <div>
          <button
            className="flex items-center bg-purple-300 border-2 border-purple-300 rounded p-2"
            onClick={handleShareClick}
          >
            Share
            <img src={share} alt="Share" className="w-5 ml-1" />
          </button>
        </div>
      </div>
    </Modal>
  );
};