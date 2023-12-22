import { Button, Container, Input } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface FetchDataPageProps {
  interval: number;
}

const FetchDataPage: React.FC<FetchDataPageProps> = ({ interval }) => {
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      fetch('http://127.0.0.1:5000/values')
        .then((response) => response.json())
        .then((data) => setUsers(data));
    }, interval);

    return () => window.clearInterval(intervalId);
  }, [interval]);

  return (
    <Container>
      {users.map((user) => (
        <Button variant="contained" color="primary" key={user}>
          {user}
        </Button>
      ))}
    </Container>
  );
};

interface ConfigurationPageProps {
  setInterval: (interval: number) => void;
}

const ConfigurationPage: React.FC<ConfigurationPageProps> = ({
  setInterval,
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

  return (
    <Container>
      <label>
        Interval (ms):
        <Input
          type="number"
          inputProps={{
            min: MIN_INTERVAL, // Set the minimum value
            max: MAX_INTERVAL, // Set the maximum value
          }}
          onChange={handleIntervalChange}
        />
      </label>
    </Container>
  );
};

const App: React.FC = () => {
  const [interval, setInterval] = useState<number>(10000);

  return (
    <Container>
      <FetchDataPage interval={interval} />
      <ConfigurationPage setInterval={setInterval} />
    </Container>
  );
};

export default App;
