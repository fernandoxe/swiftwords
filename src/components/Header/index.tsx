import { Modal } from '../Modal';
import { useState } from 'react';
import { Help } from '../Help';
import { gtm } from '../../services/gtm';
import { Charts, ChartsProps } from '../Charts';
import { ReactComponent as ResultIcon } from '../../img/icons/grid.svg';
import { ReactComponent as ChartIcon } from '../../img/icons/chart.svg';
import { ReactComponent as HelpIcon } from '../../img/icons/help.svg';
import { ReactComponent as SettingsIcon } from '../../img/icons/settings.svg';
import { Settings } from '../Settings';

export interface HeaderProps {
  showResultButton: boolean;
  charts: ChartsProps;
  onResultClick: () => void;
}

export const Header = (props: HeaderProps) => {
  const [showHelp, setShowHelp] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleHelpClick = () => {
    gtm.clickHelp();
    setShowHelp(true);
  };

  const handleChartClick = () => {
    gtm.clickChart();
    setShowChart(true);
  };

  const handleResultClick = () => {
    props.onResultClick();
  };

  const handleSettingsClick = () => {
    gtm.clickSettings();
    setShowSettings(true);
  };

  const handleHelpClose = () => {
    setShowHelp(false);
  };

  const handleChartClose = () => {
    setShowChart(false);
  };

  const handleSettingsClose = () => {
    setShowSettings(false);
  };

  return (
    <>
      <div className="flex m-2 mb-4 select-none">
        <div className="text-2xl flex flex-col items-center font-bold">
          <h1 className="text-[1.75rem] leading-none">
            {process.env.REACT_APP_TITLE}
          </h1>
          <h2 className="text-xs leading-none">
            {process.env.REACT_APP_SUBTITLE}
          </h2>
        </div>
        <div className="grow"></div>
        {props.showResultButton &&
          <button
            className="w-7 active:scale-90 duration-150"
            onClick={handleResultClick}
            aria-label="Show result"
          >
            <ResultIcon />
          </button>
        }
        {props.charts.total > 0 &&
          <button
            className="ml-2 w-7 active:scale-90 duration-150"
            onClick={handleChartClick}
            aria-label="Show statistics"
          >
            <ChartIcon />
          </button>
        }
        <button
          className="ml-2 w-7 active:scale-90 duration-150"
          onClick={handleHelpClick}
          aria-label="Show help"
        >
          <HelpIcon />
        </button>
        <button
          className="ml-2 w-7 active:scale-90 duration-150"
          onClick={handleSettingsClick}
          aria-label="Show settings"
        >
          <SettingsIcon />
        </button>
      </div>
      {showHelp &&
        <Help onClose={handleHelpClose} />
      }
      {showChart &&
        <Modal title="Statistics" onClose={handleChartClose}>
          <Charts
            total={props.charts.total}
            normal={props.charts.normal}
            random={props.charts.random}
            currentStreak={props.charts.currentStreak}
            bestStreak={props.charts.bestStreak}
            winner={props.charts.winner}
            byRow={props.charts.byRow}
          />
        </Modal>
      }
      {showSettings &&
        <Modal title="Settings" onClose={handleSettingsClose}>
          <Settings />
        </Modal>
      }
    </>
  )
};