import { useContext, useState } from 'react';
import { Context } from '../../context';
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
    } else {
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  };

  const handleHighContrastChange = (highContrast: boolean) => {
    setHighContrastValue(highContrast);
    setState({highContrast});
    localStorage.setItem('highContrast', highContrast ? '1' : '0');
  };

  return (
    <>
      <div className="flex items-center justify-start mb-4">
        <div>
          <Switch id="dark" checked={darkValue} onChange={handleDarkChange} />
        </div>
        <div className="ml-4">
          <div className="font-bold">
            Reputation mood
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
            Screaming color
          </div>
          <div className="text-sm">
            For color blindness
          </div>
        </div>
      </div>
    </>
  );
};
