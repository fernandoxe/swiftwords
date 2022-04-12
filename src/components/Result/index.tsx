import { Word } from '../Game';
import { Modal } from '../Modal';
import { ReactComponent as SongIcon } from '../../img/icons/song.svg';
import { ReactComponent as AlbumIcon } from '../../img/icons/album.svg';
import { ReactComponent as ShareIcon } from '../../img/icons/share.svg';
import { ReactComponent as CopyIcon } from '../../img/icons/copy.svg';
import { ReactComponent as RepeatIcon } from '../../img/icons/repeat.svg';
import { ReactComponent as CheckIcon } from '../../img/icons/check.svg';
import { ReactComponent as NocheckIcon } from '../../img/icons/nocheck.svg';
import { Fragment, useState } from 'react';
import { canCopy, canShare, getEmojisBoard, share } from '../../services';
import { Snackbar } from '../Snackbar';
import { Button } from '../Button';
import { gtm } from '../../services/gtm';
import { SquareI } from '../Board/Square';
import { Board } from '../Board';

export interface ResultProps {
  winner: boolean;
  word: Word;
  date: string;
  board: SquareI[][];
  random: boolean;
  onClose?: () => void;
  onRandom?: () => void;
}

export const Result = (props: ResultProps) => {
  const [copied, setCopied] = useState(false);
  
  const handleResultClose = () => {
    props.onClose?.();
  };

  const getMatchedText = (text: string, word: string) => {
    const regexp = new RegExp(`\\b${word}\\b`, 'gi');
    const words = text.split(regexp);
    return (
      words.map((w, i) =>
      <Fragment key={i}>
        {w}{i !== words.length - 1 ? <strong className="font-normal text-light-primary-600 dark:text-dark-primary-400">{word}</strong> : ''}
      </Fragment>
      )
    );
  };

  const getTitle = (random: boolean) => {
    let title = '';
    title += `${process.env.REACT_APP_TITLE}${random ? ' (random word)' : ''}`;
    title += !random ? ` ${props.date.slice(5, 10).replace('-', '/')}` : '';
    return title;
  };

  const getEmojisString = () => {
    const emojisBoard = getEmojisBoard(props.board);
    const emojisBoardString = emojisBoard
      .map(row => row.map(square => square).join('')).join('\n');
    return emojisBoardString;
  };

  const getShareText = (random: boolean) => {
    let text = '';
    text += `${getTitle(random)}\n\n`;
    if(random) {
      text += `🔤 ${props.word.word}\n`;
      text += `🎶 ${props.word.line} 🎶\n`;
      text += `🎼 ${props.word.song}\n`;
      text += `💿 ${props.word.album}\n\n`;
    }
    text += `${getEmojisString()}\n\n${process.env.REACT_APP_SHORT_URL}`;
    return text;
  };

  const handleShareClick = async () => {
    gtm.share('result', props.random, props.winner);
    try {
      await share(getShareText(props.random));
      console.log('Share result successful');
    } catch (error: any) {
      gtm.shareError('result', error.message);
      console.log('Share result error', error.message);
    }
  };

  const handleCopyClick = async () => {
    gtm.copy('result', props.random, props.winner);
    try {
      await navigator.clipboard.writeText(`${getShareText(props.random)}`);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 3000);
      console.log('Copy result successful');
    } catch (error: any) {
      gtm.copyError(error.message);
      console.log('Copy result error', error.message);
    }
  };

  const handleRandomClick = () => {
    gtm.playRandom(props.winner);
    props.onRandom?.();
  };

  return (
    <Modal
      title={getTitle(props.random)}
      onClose={handleResultClose}
    >
      <div className="flex flex-col items-center">
          {props.winner &&
          <div className="mb-2 w-11 text-light-success-500 dark:text-dark-success-600">
            <CheckIcon />
          </div>
          }
          {!props.winner &&
            <div className="mb-2 w-11 text-red-600 dark:text-red-700">
              <NocheckIcon />
            </div>
          }
        <div className="mb-5 text-center text-light-primary-600 dark:text-dark-primary-400 text-4xl">
          {props.word.word}
        </div>
        <div className="text-lg leading-none mb-1 text-center">
          <i>
            {getMatchedText(props.word.line, props.word.word)}
          </i>
        </div>
        <div className="flex items-center mb-1">
          <div className="w-5 mr-1">
            <SongIcon />
          </div>
          {props.word.song}
        </div>
        <div className="flex items-center mb-5">
          <div className="w-5 mr-1">
            <AlbumIcon />
          </div>
          {props.word.album}
        </div>
        <div className="flex mb-5">
          <div className="flex items-center">
            <Board board={props.board} small />
          </div>
          {(canShare() || canCopy()) &&
            <div className="flex flex-col items-center justify-center ml-4">
              {canShare() &&
                <div className="mb-3">
                  <Button onClick={handleShareClick}>
                    <span>Share</span>
                    <div className="w-5 ml-1">
                      <ShareIcon />
                    </div>
                  </Button>
                </div>
              }
              {canCopy() &&
                <div>
                  <Button
                    onClick={handleCopyClick}
                  >
                    <span>Copy</span>
                    <div className="w-5 ml-1">
                      <CopyIcon />
                    </div>
                  </Button>
                </div>
              }
            </div>
          }
        </div>
        <div className="text-center mb-3">
          Come back tomorrow for a new {process.env.REACT_APP_TITLE} of the day
        </div>
        <Button
          bordered
          onClick={handleRandomClick}
        >
          <span>Try a random {process.env.REACT_APP_TITLE}</span>
          <div className="w-5 ml-1">
            <RepeatIcon />
          </div>
        </Button>
      </div>
      {copied &&
        <Snackbar />
      }
    </Modal>
  );
};