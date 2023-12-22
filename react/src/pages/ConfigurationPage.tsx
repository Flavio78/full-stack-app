import { Container, Input, InputLabel, ToggleButton } from '@mui/material';
import React, { Dispatch, FC, SetStateAction } from 'react';
import { MAX_INTERVAL, MIN_INTERVAL } from '../constants/UIsettings';

interface ConfigurationPageProps {
  isDarkMode: boolean;
  setInterval: Dispatch<SetStateAction<number>>;
  setIsDarkMode: Dispatch<SetStateAction<boolean>>;
}

const ConfigurationPage: FC<ConfigurationPageProps> = ({
  setInterval,
  setIsDarkMode,
  isDarkMode,
}) => {
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
