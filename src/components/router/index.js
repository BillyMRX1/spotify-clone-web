import { BrowserRouter as Router, Switch, Route, Redirect, } from 'react-router-dom';
import Playlist from '../../page/playlist/playlist'
import Login from '../../page/login/login'
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../redux/reducer/reducer'

const SpotifyRoute = () => {
    const client_id = process.env.REACT_APP_CLIENT_ID;
    const scope = process.env.REACT_APP_SCOPE;
    const redirect = process.env.REACT_APP_REDIRECT;
    const auth_link = `https://accounts.spotify.com/id/authorize?response_type=token&client_id=${client_id}&scope=${scope}&redirect_uri=${redirect}&show_dialog=true`;
    const token = useSelector((state) => state.token.token)
    const dispatch = useDispatch()

    const getHash = () => {
        const hash = window.location.hash
          .substring(1)
          .split("&")
          .reduce(function(initial, item) {
            if (item) {
              var parts = item.split("=");
              initial[parts[0]] = decodeURIComponent(parts[1]);
            }
            return initial;
          }, {});
        
        window.location.hash = "";
    
        return hash;
      };

    const componentDidMount = () => {
        const hash = getHash();
        const temp = hash.access_token;
        if(temp){
          dispatch(setToken(temp))
        }
    };

    componentDidMount();

    console.log(token)
    return(
        <Router>
            <Switch>
                <Route path="/create-playlist">
                    {token === " " ? <Redirect to="/"/> : <Playlist/>}
                </Route>
                <Route path="/">
                    {token === " " ? <Login auth_link={auth_link}/> : <Redirect to="/create-playlist"/>}
                </Route>
            </Switch>
        </Router>
    )
}

export default SpotifyRoute;