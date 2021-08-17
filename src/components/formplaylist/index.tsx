import axios from 'axios';
import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, makeStyles, Typography } from '@material-ui/core';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';

const useStyles = makeStyles({
  textField: {
    backgroundColor: 'white',
    marginLeft: 30,
    marginBottom: 10,
    width: 300,
    borderRadius: 4
  },
  textH6: {
    marginTop: 10,
    marginLeft: 30
  },
  btnSubmit: {
    display: 'flex',
    marginLeft: 30,
    marginTop: 10,
    '&:hover': {
      backgroundColor: 'green'
    }
  }
});

interface FormPlaylistProps{
  userId: string
  data: string[]
}

const FormPlaylistComponent: React.FC<FormPlaylistProps> = (props: FormPlaylistProps) => {
  const { userId, data } = props;
  const token = `Bearer ${localStorage.getItem('token')}`;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const minimumTitle = 10;
  const minimumDescription = 20;
  const classes = useStyles();

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const addToPlaylist = async (playlistId: string) => {
    try {
      const response = await axios.post(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          uris: data
        },
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = `https://api.spotify.com/v1/users/${userId}/playlists`;
    const submitPlaylist = () => {
      try {
        axios
          .post(
            endpoint,
            {
              name: title,
              description,
              collaborative: false,
              public: false
            },
            {
              headers: {
                Authorization: token,
                Accept: 'application/json',
                'Content-Type': 'application/json'
              }
            }
          )
          .then((response) => {
            addToPlaylist(response.data.id);
          });
      } catch (error) {
        console.error(error);
      }
    };

    setTitleError(false);
    setDescriptionError(false);

    if (title.length < minimumTitle) {
      setTitleError(true);
      alert('Minimum Title 10 Character');
    } else if (description.length < minimumDescription) {
      setDescriptionError(true);
      alert('Minimum Description 20 Character');
    } else {
      submitPlaylist();
      alert('Playlist Created!');
    }
  };

  return (
    <div>
      <form noValidate autoComplete="off">
        <Typography className={classes.textH6} variant="h6">
          Playlist Title:
        </Typography>
        <TextField
          className={classes.textField}
          type="text"
          variant="filled"
          color="primary"
          label="Minimum Character 10"
          required
          error={titleError}
          onChange={handleTitle}
        />
        <Typography className={classes.textH6} variant="h6">
          Playlist Description:
        </Typography>
        <TextField
          className={classes.textField}
          type="text"
          variant="filled"
          color="primary"
          label="Minimum Character 20"
          required
          multiline
          rows={3}
          error={descriptionError}
          onChange={handleDescription}
        />
        <Button
          onClick={handleSubmit}
          className={classes.btnSubmit}
          color="primary"
          variant="contained"
          size="large"
          endIcon={<CreateNewFolderIcon />}
        >
          Create
        </Button>
      </form>
    </div>
  );
};

export default FormPlaylistComponent;
