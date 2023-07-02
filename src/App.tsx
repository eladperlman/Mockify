import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Sidepanel from './views/Sidepanel';
import Main from './views/Main';
import './index.css';

function App() {
  const theme = createTheme({
    palette: {
      mode: 'dark',
      secondary: {
        main: '#26282B',
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Main />
      <Sidepanel />
    </ThemeProvider>
  );
}

export default App;
