import { createTheme, ThemeProvider } from '@material-ui/core';
import SpotifyRoute from './components/router/index';
import HeaderComponent from './components/header';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00AA13',
    },
    secondary: {
      main: '#EE2737',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <header>
          <HeaderComponent />
        </header>
        <main>
          <SpotifyRoute />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
