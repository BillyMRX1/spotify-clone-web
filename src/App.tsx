import { createTheme, ThemeProvider } from '@material-ui/core';
import SpotifyRoute from './components/router/index';
import HeaderComponent from './components/header';
import './App.css';
import FooterComponent from './components/footer';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00AA13'
    },
    secondary: {
      main: '#EE2737'
    }
  }
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="main-body">
        <header>
          <HeaderComponent />
        </header>
        <main>
          <SpotifyRoute />
        </main>
        <footer>
          <FooterComponent />
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
