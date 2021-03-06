import { useContext, useState } from 'react';
import { Context } from '../../context';
import { gtm } from '../../services/gtm';
import { Switch } from '../Switch';

export const Settings = () => {
  const [darkValue, setDarkValue] = useState(localStorage.getItem('theme') === 'dark' ? true : false);
  const { state, setState} = useContext(Context);
  const [highContrastValue, setHighContrastValue] = useState(state.highContrast);

  const handleDarkChange = (dark: boolean) => {
    setDarkValue(dark);
    if(dark) {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      gtm.setTheme('dark', highContrastValue);
    } else {
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      gtm.setTheme('light', highContrastValue);
    }
  };

  const handleHighContrastChange = (highContrast: boolean) => {
    setHighContrastValue(highContrast);
    setState({highContrast});
    localStorage.setItem('highContrast', highContrast ? '1' : '0');
    gtm.setHighContrast(highContrast, darkValue ? 'dark' : 'light');
  };

  return (
    <>
      <div className="flex items-center justify-start mb-4">
        <div>
          <Switch id="dark" checked={darkValue} onChange={handleDarkChange} />
        </div>
        <div className="ml-4">
          <div className="font-bold">
            {process.env.REACT_APP_DARK_TEXT}
          </div>
          <div className="text-sm">
            Dark theme
          </div>
        </div>
      </div>
      <div className="flex items-center justify-start">
        <div>
          <Switch id="highContrast" checked={highContrastValue} onChange={handleHighContrastChange} />
        </div>
        <div className="ml-4">
          <div className="font-bold">
            {process.env.REACT_APP_COLOR_TEXT}
          </div>
          <div className="text-sm">
            For color blindness
          </div>
        </div>
      </div>
    </>
  );
};
