import { Button, Container } from '@mui/material';
import React, { useEffect, useState } from 'react';

const FetchDataPage: React.FC = () => {
  const [users, setUsers] = useState<string[]>([]);
  const [interval, setInterval] = useState<number>(10000);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch('/users')
        .then(response => response.json())
        .then(data => setUsers(data));
    }, interval);

    return () => clearInterval(intervalId);
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

const ConfigurationPage: React.FC<{ setInterval: (interval: number) => void }> = ({ setInterval }) => {
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

