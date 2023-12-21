import { Button, Container } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface FetchDataPageProps {
  interval: number;
}

const FetchDataPage: React.FC<FetchDataPageProps> = ({ interval }) => {
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      fetch('http://127.0.0.1:5000/users')
        .then(response => response.json())
        .then(data => setUsers(data));
    }, interval);

    return () => window.clearInterval(intervalId);
  }, [interval]);

  return (
    <Container>
      {users.map(user => (
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

const ConfigurationPage: React.FC<ConfigurationPageProps> = ({ setInterval }) => {
  const handleIntervalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInterval(Number(event.target.value));
  };

  return (
    <Container>
      <label>
        Interval (ms):
        <input type="number" onChange={handleIntervalChange} />
      </label>
    </Container>
  );
};

const App: React.FC = () => {
  const [interval, setInterval] = useState<number>(10000);

  return (
    <Container>
      <ConfigurationPage setInterval={setInterval} />
      <FetchDataPage interval={interval} />
    </Container>
  );
};

export default App;

