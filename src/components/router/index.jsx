import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PlaylistPage from '../../page/create_playlist/create_playlist';
import LoginPage from '../../page/login/login';
import { setToken } from '../redux/reducer/reducer';
import ProfilePage from '../../page/profile/profile';
import MyPlaylistPage from '../../page/my_playlist/playlist';

const SpotifyRoute = () => {
  const client_id = process.env.REACT_APP_CLIENT_ID;
  const scope = process.env.REACT_APP_SCOPE;
  const redirect = process.env.REACT_APP_REDIRECT;
  const token = useSelector((state) => state.token.token);
  const auth_link = `https://accounts.spotify.com/id/authorize?response_type=token&client_id=${client_id}&scope=${scope}&redirect_uri=${redirect}&show_dialog=true`;
  const dispatch = useDispatch();

  const getHash = () => {
    const hash = window.location.hash
      .substring(1)
      .split('&')
      .reduce((initial, item) => {
        if (item) {
          const parts = item.split('=');
          initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
      }, {});

    window.location.hash = '';

    return hash;
  };

  const componentDidMount = () => {
    const hash = getHash();
    const temp = hash.access_token;
    if (temp) {
      dispatch(setToken(temp));
      localStorage.setItem('token', temp);
    }
  };

  componentDidMount();

  return (
    <Router>
      <Routes>
        <Route
          path="/create-playlist"
          element={
            localStorage.getItem('token') === ' ' ? (
              <Navigate to="/" />
            ) : (
              <PlaylistPage />
            )
          }
        />
        <Route
          path="/profile"
          element={
            localStorage.getItem('token') === ' ' ? (
              <Navigate to="/" />
            ) : (
              <ProfilePage />
            )
          }
        />
        <Route
          path="/my-playlist"
          element={
            localStorage.getItem('token') === ' ' ? (
              <Navigate to="/" />
            ) : (
              <MyPlaylistPage />
            )
          }
        />
        <Route
          path="/"
          element={
            token === ' ' ? (
              <LoginPage auth_link={auth_link} />
            ) : (
              <Navigate to="/create-playlist" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default SpotifyRoute;
