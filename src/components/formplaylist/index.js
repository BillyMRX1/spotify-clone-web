import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { Button, makeStyles, Typography } from "@material-ui/core";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";

const useStyles = makeStyles({
  textField: {
    backgroundColor: "white",
    marginLeft: 30,
    marginBottom: 10,
    width: 300,
    borderRadius: 4,
  },
  textH6: {
    marginTop: 10,
    marginLeft: 30,
  },
  btnSubmit: {
    display: "flex",
    marginLeft: 30,
    marginTop: 10,
    "&:hover": {
      backgroundColor: "green",
    },
  },
});

const FormPlaylistComponent = (props) => {
  const { userId, data } = props;
  const token = `Bearer ${useSelector((state) => state.token.token)}`;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const minimumTitle = 10;
  const minimumDescription = 20;
  const classes = useStyles();

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const endpoint = `https://api.spotify.com/v1/users/${userId}/playlists`;
    const submitPlaylist = () => {
      try {
        axios
          .post(
            endpoint,
            {
              name: title,
              description: description,
              collaborative: false,
              public: false,
            },
            {
              headers: {
                Authorization: token,
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            addToPlaylist(response.data.id);
          });
      } catch (error) {
        console.error(error);
      }
    };
    const addToPlaylist = async (playlistId) => {
      try {
        const response = await axios.post(
          `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
          {
            uris: data,
          },
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    setTitleError(false);
    setDescriptionError(false);

    if (title.length < minimumTitle) {
      setTitleError(true);
      alert("Minimum Title 10 Character");
    } else if (description.length < minimumDescription) {
      setDescriptionError(true);
      alert("Minimum Description 20 Character");
    } else {
      submitPlaylist();
      alert("Playlist Created!");
    }
  };

  return (
    <div>
      <form noValidate autoComplete="off">
        <Typography className={classes.textH6} variant="h6">
          Title:
        </Typography>
        <TextField
          className={classes.textField}
          type="text"
          variant="filled"
          color="primary"
          label="Playlist Title"
          required
          error={titleError}
          onChange={handleTitle}
        ></TextField>
        <Typography className={classes.textH6} variant="h6">
          Description:
        </Typography>
        <TextField
          className={classes.textField}
          type="text"
          variant="filled"
          color="primary"
          label="Playlist Description"
          required
          multiline
          rows={3}
          error={descriptionError}
          onChange={handleDescription}
        ></TextField>
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
