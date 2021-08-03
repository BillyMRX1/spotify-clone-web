import "./App.css";
import SpotifyRoute from "./components/router/index";
import HeaderComponent from "./components/header";

function App() {
  return (
    <div>
      <header>
        <HeaderComponent />
      </header>
      <main>
        <SpotifyRoute />
      </main>
    </div>
  );
}

export default App;
