import { Button, Container, InputLabel } from '@mui/material';
import { FC, useEffect, useState } from 'react';

interface FetchDataPageProps {
  interval: number;
}

const FetchDataPage: FC<FetchDataPageProps> = ({ interval }) => {
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
      <InputLabel required={false} disabled={true}>
        Data
      </InputLabel>
      {users.map((user) => (
        <Button variant="contained" color="primary" key={user}>
          {user}
        </Button>
      ))}
    </Container>
  );
};

export default FetchDataPage;
