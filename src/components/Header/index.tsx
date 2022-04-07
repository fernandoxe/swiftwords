import { Modal } from '../Modal';
import { useState } from 'react';
import { Help } from '../Help';
import { gtm } from '../../services/gtm';
import { Charts, ChartsProps } from '../Charts';
import { ReactComponent as ResultIcon } from '../../img/icons/grid.svg';
import { ReactComponent as ChartIcon } from '../../img/icons/chart.svg';
import { ReactComponent as HelpIcon } from '../../img/icons/help.svg';
// import { ReactComponent as SettingsIcon } from '../../img/icons/settings.svg';

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

  // const handleSettingsClick = () => {
  //   setShowSettings(true);
  // };

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
      <div className="flex p-4 select-none">
        <div className="text-2xl grow flex items-center leading-none font-bold">
          Swiftdle
        </div>
        {props.showResultButton &&
          <button
            className="ml-1 w-6"
            onClick={handleResultClick}
          >
            <ResultIcon />
          </button>
        }
        {props.charts.total > 0 &&
          <button
            className="ml-1 w-6"
            onClick={handleChartClick}
          >
            <ChartIcon />
          </button>
        }
        <button
          className="ml-1 w-6"
          onClick={handleHelpClick}
        >
          <HelpIcon />
        </button>
        {/* <button
          className="ml-1 w-6"
          onClick={handleSettingsClick}
        >
          <SettingsIcon />
        </button> */}
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
        </Modal>
      }
    </>
  )
};