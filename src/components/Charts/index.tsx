import { canCopy, canShare, percent, share } from '../../services';
import { Button } from '../Button';
import { ReactComponent as ShareIcon } from '../../img/icons/share.svg';
import { ReactComponent as CopyIcon } from '../../img/icons/copy.svg';
import { gtm } from '../../services/gtm';
import { useState } from 'react';
import { Snackbar } from '../Snackbar';
import { captureException } from '@sentry/react';

export interface ChartsProps {
  total: number;
  normal: number;
  random: number;
  currentStreak: number;
  bestStreak: number;
  winner: number;
  byRow: number[];
}

export const Charts = (props: ChartsProps) => {
  const gamesWon = percent(props.winner, props.total);
  const wonByRow = props.byRow.map(x => ({winner: x, width: percent(x, props.total)}));
  const [copied, setCopied] = useState(false);

  const getTitle = () => {
    return `My ${process.env.REACT_APP_TITLE} statistics to date`;
  };

  const getShareText = () => {
    let text = '';
    text += `${getTitle()}\n\n`;
    text += `Total games: ${props.total}\n`;
    text += `${process.env.REACT_APP_TITLE}: ${props.normal}\n`;
    text += `Random: ${props.random}\n\n`;
    text += `Current streak: ${props.currentStreak}\n`;
    text += `Best streak: ${props.bestStreak}\n`;
    text += `Games won: ${props.winner}\n\n`;
    text += `\n${process.env.REACT_APP_SHORT_URL}`;
    return text;
  };

  const handleShareClick = async () => {
    console.log('getShareText:\n', getShareText());
    gtm.share('charts', false, false);
    try {
      await share(getShareText());
      console.log('Share charts successful');
    } catch (error: any) {
      gtm.shareError('charts', error.message);
      console.log('Share charts error', error.message);
      captureException(error);
    }
  };

  const handleCopyClick = async () => {
    gtm.copy('charts', false, false);
    try {
      await navigator.clipboard.writeText(`${getShareText()}`);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 3000);
      console.log('Copy charts successful');
    } catch (error: any) {
      gtm.copyError(error.message);
      console.log('Copy charts error', error.message);
      captureException(error);
    }
  };

  return (
    <>
      <div className="font-bold text-lg mb-4">
        Total games: {props.total}
      </div>
      <div className="flex font-bold mb-4">
        <div className="mr-5">
          {process.env.REACT_APP_TITLE}: {props.normal}
        </div>
        <div>
          Random: {props.random}
        </div>
      </div>
      <div className="flex font-bold mb-4">
        <div className="mr-5">
          Current streak: {props.currentStreak}
        </div>
        <div>
          Best streak: {props.bestStreak}
        </div>
      </div>
      <div className="font-bold mb-1">
        Games won
      </div>
      <div className="relative flex grow mb-4">
        <div className={`h-4 border-l border-l-light-primary-300 dark:border-l-dark-primary-700 bg-light-primary-300 dark:bg-dark-primary-700`} style={{width: gamesWon}}>
        </div>
        <div className="absolute right-0 mr-1 text-sm font-bold">
          {props.winner}
        </div>
      </div>
      <div className="font-bold mb-1">
        Games won by row
      </div>
      {wonByRow.map((row, index) =>
        <div key={index} className={`flex items-center ${index === wonByRow.length - 1 ? '' : 'mb-1'}`}>
          <div className="text-sm w-3.5 leading-none">
            {index + 1}
          </div>
          <div className="relative flex grow">
            <div className="h-4 border-l border-l-light-primary-300 dark:border-l-dark-primary-700 bg-light-primary-300 dark:bg-dark-primary-700" style={{width: row.width}}>
            </div>
            <div className="absolute right-0 mr-1 text-sm font-bold">
              {row.winner}
            </div>
          </div>
        </div>
      )}
      {(canShare() || canCopy()) &&
        <div className="flex justify-center mt-4">
          {canShare() &&
            <div>
              <Button
                onClick={handleShareClick}
                aria-label="Share"
              >
                <span>Share</span>
                <div className="w-5 ml-1">
                  <ShareIcon />
                </div>
              </Button>
            </div>
          }
          {canCopy() &&
            <div className="ml-2">
              <Button
                onClick={handleCopyClick}
                aria-label="Copy"
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
      {copied &&
        <Snackbar />
      }
    </>
  );
};
