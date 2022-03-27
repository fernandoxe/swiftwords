import help from '../../img/icons/help.svg';
import chart from '../../img/icons/chart.svg';
import grid from '../../img/icons/grid.svg';
// import settings from '../../img/icons/settings.svg';
import { Modal } from '../Modal';
import { useState } from 'react';
import { Help } from '../Help';
import { gtm } from '../../services/gtm';
import { Chart } from '../Chart';

export interface HeaderProps {
  showResultButton: boolean;
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
            onClick={handleResultClick}
          >
            <img src={grid} alt="Chart" />
          </button>
        }
        <button
          className="ml-1"
          onClick={handleChartClick}
        >
          <img src={chart} alt="Chart" />
        </button>
        <button
          className="ml-1"
          onClick={handleHelpClick}
        >
          <img src={help} alt="Help" />
        </button>
        {/* <button onClick={handleSettingsClick}>
          <img src={settings} alt="Settings" />
        </button> */}
      </div>
      {showHelp &&
        <Help onClose={handleHelpClose} />
      }
      {showChart &&
        <Modal title="Charts" onClose={handleChartClose}>
          <Chart />
        </Modal>
      }
      {showSettings &&
        <Modal title="Settings" onClose={handleSettingsClose}>
        </Modal>
      }
    </>
  )
};