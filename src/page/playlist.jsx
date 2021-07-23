import {Component} from 'react'
import Landing from '../components/landing'
import './index.css';

class CardPlaylist extends Component{
    constructor(props){
        super(props)
        this.client_id = process.env.REACT_APP_CLIENT_ID;
        this.scope = process.env.REACT_APP_SCOPE;
        this.redirect = process.env.REACT_APP_REDIRECT;
        this.auth_link = `https://accounts.spotify.com/id/authorize?response_type=token&client_id=${this.client_id}&scope=${this.scope}&redirect_uri=${this.redirect}&&show_dialog=true`;
        this.state = {
            token: null
        }
    }

    getHash = () => {
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
      }

    componentDidMount() {
        const hash = this.getHash();
        const token = hash.access_token;
    
        if (token) {
          this.setState({
            token
          })
        } 
    }

    render(){
        const {token} = this.state;

        return(
            <div>
                {this.state.token === null
                ? <a href={this.auth_link} onClick={this.login} className="btn">Login</a>
                : <Landing token={token}/>
                }
            </div>
        )
    }
}

export default CardPlaylist;