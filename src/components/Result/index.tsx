import { Word } from '../Game';
import { Modal } from '../Modal';
import song from '../../img/icons/song.svg';
import album from '../../img/icons/album.svg';
import share from '../../img/icons/share.svg';
import copy from '../../img/icons/copy.svg';
import repeat from '../../img/icons/repeat.svg';
import check from '../../img/icons/check.svg';
import nocheck from '../../img/icons/nocheck.svg';
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
        {w}{i !== words.length - 1 ? <strong className="font-normal text-purple-500">{word}</strong> : ''}
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
        <div className="mb-1 text-center">
          <img className="w-8" src={props.winner ? check : nocheck} alt={props.winner ? 'Guessed' : 'Not guessed'} />
        </div>
        <div className="text-sm mb-4 text-center">
          The word was <span className="text-purple-500">{props.word.word}</span>
        </div>
        <div className="mb-1 text-center">
          <i>
            {getMatchedText(props.word.line, props.word.word)}
          </i>
        </div>
        <div className="text-sm flex items-center mb-1">
          <img src={song} alt="song" className="w-[1.125rem] mr-1" />{props.word.song}
        </div>
        <div className="text-sm flex items-center mb-4">
          <img src={album} alt="album" className="w-[1.125rem] mr-1" />{props.word.album}
        </div>
        {canShare() &&
          <Button onClick={handleShareClick}>
            <span className="text-sm">Share result</span>
            <img src={share} alt="Share" className="w-5 ml-1" />
          </Button>
        }
        {/* {!canShare && canCopy && */}
          <Button
            onClick={handleCopyClick}
          >
            <span className="text-sm">Copy result</span>
            <img src={copy} alt="Copy" className="w-5 ml-1" />
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
          <img src={repeat} alt="Random word" className="w-5 ml-1" />
        </Button>
      </div>
      {copied &&
        <Snackbar />
      }
    </Modal>
  );
};