import { Container, Input, InputLabel, ToggleButton } from '@mui/material';
import React, { Dispatch } from 'react';

interface ConfigurationPageProps {
  isDarkMode: boolean;
  setInterval: Dispatch<React.SetStateAction<number>>;
  setIsDarkMode: Dispatch<React.SetStateAction<boolean>>;
}

const ConfigurationPage: React.FC<ConfigurationPageProps> = ({
  setInterval,
  setIsDarkMode,
  isDarkMode,
}) => {
  const MIN_INTERVAL = 2000;
  const MAX_INTERVAL = 60000;

  const handleIntervalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseInt(event.target.value, 10);
    const minValue = MIN_INTERVAL;
    const maxValue = MAX_INTERVAL;

    // Validate the input value
    if (inputValue < minValue) {
      event.target.value = `${minValue}`; // Reset to the minimum value
    } else if (inputValue > maxValue) {
      event.target.value = `${maxValue}`; // Reset to the maximum value
    } else setInterval(Number(event.target.value));
  };

  const handleSetDarkMode = () => {
    setIsDarkMode((prevIsToggled: boolean) => !prevIsToggled);
  };

  return (
    <Container>
      <InputLabel>
        Interval:
        <Input
          type="number"
          inputProps={{
            min: MIN_INTERVAL, // Set the minimum value
            max: MAX_INTERVAL, // Set the maximum value
          }}
          onChange={handleIntervalChange}
        />
        (ms)
      </InputLabel>
      <ToggleButton onClick={handleSetDarkMode} value={isDarkMode}>
        Set Dark Mode
      </ToggleButton>
    </Container>
  );
};

export default ConfigurationPage;
