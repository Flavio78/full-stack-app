import { Button, CircularProgress, Container, InputLabel } from '@mui/material';
import { FC, useEffect, useState } from 'react';

interface FetchDataPageProps {
  interval: number;
}

const FetchDataPage: FC<FetchDataPageProps> = ({ interval }) => {
  const [values, setValues] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setLoading(true);
      fetch('http://127.0.0.1:5000/values')
        .then((response) => response.json())
        .then((data) => {
          setValues(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }, interval);

    return () => window.clearInterval(intervalId);
  }, [interval]);

  return (
    <Container>
      <InputLabel required={false} disabled={true}>
        Data
      </InputLabel>
      {loading ? (
        <InputLabel required={false} disabled={true}>
          <CircularProgress />
          Loading ...
        </InputLabel>
      ) : error ? (
        <InputLabel required={false} disabled={true} error={true}>
          Error
        </InputLabel>
      ) : (
        values.map((user) => (
          <Button variant="contained" color="primary" key={user}>
            {user}
          </Button>
        ))
      )}
    </Container>
  );
};

export default FetchDataPage;
