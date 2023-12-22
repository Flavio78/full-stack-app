import { Container, CssBaseline, useMediaQuery } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useMemo, useState } from 'react';
import ConfigurationPage from './pages/ConfigurationPage';
import FetchDataPage from './pages/FetchDataPage';

const App: React.FC = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [interval, setInterval] = useState<number>(10000);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(prefersDarkMode); // State to toggle mode

  const lightTheme = createTheme({ palette: { mode: 'light' } });
  const darkTheme = createTheme({ palette: { mode: 'dark' } });

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  );

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
