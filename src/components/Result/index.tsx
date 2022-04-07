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
import { canShare } from '../../services';
import { Snackbar } from '../Snackbar';
import { Button } from '../Button';
import { gtm } from '../../services/gtm';

export interface ResultProps {
  winner: boolean;
  word: Word;
  date: string;
  emojisBoard: string[][];
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

  const emojisBoardToString = () => {
    const emojisBoardString = props.emojisBoard
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
    text += `${emojisBoardToString()}\n\n${process.env.REACT_APP_SHORT_URL}`;
    return text;
  };

  const handleShareClick = async () => {
    gtm.share(props.random, props.winner);
    try {
      await navigator.share({
        text: `${getShareText(props.random)}`,
        title: process.env.REACT_APP_TITLE,
        // url: process.env.REACT_APP_URL,
      });
      console.log('Share successful');
    } catch (error: any) {
      gtm.shareError(error.message);
      console.log('Share error', error.message);
    }
  };

  const handleCopyClick = async () => {
    gtm.copy(props.random, props.winner);
    try {
      await navigator.clipboard.writeText(`${getShareText(props.random)}`);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 3000);
      console.log('Copy successful');
    } catch (error: any) {
      gtm.copyError(error.message);
      console.log('Share copy error', error.message);
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
          <div className="mb-1 w-8 text-light-success-500 dark:text-dark-success-600">
            <CheckIcon />
          </div>
          }
          {!props.winner &&
            <div className="mb-1 w-8 text-red-600 dark:text-red-700">
              <NocheckIcon />
            </div>
          }
        <div className="text-sm mb-4 text-center">
          The word was <span className="text-light-primary-600 dark:text-dark-primary-400">{props.word.word}</span>
        </div>
        <div className="mb-1 text-center">
          <i>
            {getMatchedText(props.word.line, props.word.word)}
          </i>
        </div>
        <div className="text-sm flex items-center mb-1">
          <div className="w-[1.125rem] mr-1">
            <SongIcon />
          </div>
          {props.word.song}
        </div>
        <div className="text-sm flex items-center mb-4">
          <div className="w-[1.125rem] mr-1">
            <AlbumIcon />
          </div>
          {props.word.album}
        </div>
        {canShare() &&
          <Button onClick={handleShareClick}>
            <span className="text-sm">Share result</span>
            <div className="w-5 ml-1">
              <ShareIcon />
            </div>
          </Button>
        }
        {/* {!canShare && canCopy && */}
          <Button
            onClick={handleCopyClick}
          >
            <span className="text-sm">Copy result</span>
            <div className="w-5 ml-1">
              <CopyIcon />
            </div>
          </Button>
        {/* } */}
        <div className="text-sm text-center mb-4">
          Come back tomorrow for a new {process.env.REACT_APP_TITLE} of the day
        </div>
        <Button
          bordered
          onClick={handleRandomClick}
        >
          <span className="text-sm">Try a random {process.env.REACT_APP_TITLE}</span>
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