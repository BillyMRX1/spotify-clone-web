import { Button, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  text: {
    marginBottom: 20
  },
  textH6: {
    fontWeight: 'bold',
    marginBottom: 10
  }
});

interface CardProps {
  playlistTitle: string;
  owner: string;
  playlist_url: string;
}

const CardPlaylistComponent: React.FC<CardProps> = (props: CardProps) => {
  const classes = useStyles();
  const { playlistTitle, owner, playlist_url } = props;
  return (
    <div className="card" data-testid="track-component">
      <div className="container">
        <Typography className={classes.textH6} variant="h6" align="center">
          {playlistTitle}
        </Typography>
        <Typography className={classes.text} align="center">
          owner: {owner}
        </Typography>
        <Button color="primary" variant="contained" href={playlist_url}>
          Go to Playlist
        </Button>
      </div>
    </div>
  );
};

export default CardPlaylistComponent;
