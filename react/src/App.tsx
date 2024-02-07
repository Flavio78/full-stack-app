import { Container, CssBaseline, useMediaQuery } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { FC, useState } from 'react';
import { MIN_INTERVAL } from './constants/UIsettings';
import ConfigurationPage from './pages/ConfigurationPage';
import FetchDataPage from './pages/FetchDataPage';

const App: FC = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [interval, setInterval] = useState<number>(MIN_INTERVAL);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(prefersDarkMode); // State to toggle mode

  const lightTheme = createTheme({ palette: { mode: 'light' } });
  const darkTheme = createTheme({ palette: { mode: 'dark' } });

  console.log('here');

  /*
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  );
  */

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Container>
        <FetchDataPage interval={interval} />
        <ConfigurationPage
          setInterval={setInterval}
          setIsDarkMode={setIsDarkMode}
          isDarkMode={isDarkMode}
        />
      </Container>
    </ThemeProvider>
  );
};

export default App;
