import { Container, makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import CardPlaylistComponent from '../../components/card_playlist';

const useStyles = makeStyles({
  textH4: {
    marginLeft: 30,
    marginTop: 30,
    marginBottom: 20,
    fontWeight: 'bold'
  },
  playlistContainer: {
    display: 'flex',
    position: 'relative',
    minHeight: '80vh',
    alignItems: 'center',
    flexDirection: 'column'
  }
});

interface MyPlaylistProps {
  id: string;
  external_urls: External;
  name: string;
  owner: Owner;
}

interface External {
  spotify: string;
}

interface Owner {
  display_name: string;
}

const MyPlaylistPage: React.FC = () => {
  const classes = useStyles();
  const token = localStorage.getItem('token');
  const [myPlaylist, setMyPlaylist] = useState([]);

  useEffect(() => {
    const getUserPlaylist = async () => {
      try {
        const response = await axios.get(
          'https://api.spotify.com/v1/me/playlists',
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
          }
        );
        setMyPlaylist(response.data.items);
        console.log(response.data.items);
      } catch (error) {
        console.error(error);
      }
    };

    getUserPlaylist();
  }, []);

  return (
    <Container className={classes.playlistContainer}>
      <Typography className={classes.textH4} variant="h4">
        My Playlist
      </Typography>
      <div className="card-music">
        {myPlaylist.map((playlist: MyPlaylistProps) => (
          <CardPlaylistComponent
            key={playlist.id}
            playlistTitle={playlist.name}
            owner={playlist.owner.display_name}
            playlist_url={playlist.external_urls.spotify}
          />
        ))}
      </div>
    </Container>
  );
};

export default MyPlaylistPage;
