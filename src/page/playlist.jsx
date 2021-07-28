import Landing from '../components/landing'
import './style.css';
import { setToken } from '../components/redux/reducer/reducer'
import { useDispatch, useSelector } from 'react-redux';

const CardPlaylist = () => {
    const client_id = process.env.REACT_APP_CLIENT_ID;
    const scope = process.env.REACT_APP_SCOPE;
    const redirect = process.env.REACT_APP_REDIRECT;
    const auth_link = `https://accounts.spotify.com/id/authorize?response_type=token&client_id=${client_id}&scope=${scope}&redirect_uri=${redirect}&&show_dialog=true`;
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
        
        window.location.hash = " ";
    
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

    return(
      <div>
          {token === " "
          ? <a href={auth_link} className="btn">Login</a>
          : <Landing/>
          }
      </div>
    )
}

export default CardPlaylist;