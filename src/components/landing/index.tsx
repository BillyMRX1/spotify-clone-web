import CardComponent from "../card/index";
import axios from "axios";
import React, { useState } from "react";
import FormPlaylistComponent from "../formplaylist/index";
import UserComponent from "../user";
import TextField from "@material-ui/core/TextField";
import { Button, Container, makeStyles, Typography } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import "./style.css";

const useStyles = makeStyles({
  textField: {
    backgroundColor: "white",
    marginLeft: 30,
    width: "90%",
    borderRadius: 4,
  },
  btnSearch: {
    "&:hover": {
      backgroundColor: "green",
    },
    alignContent: "center",
  },
  textH4: {
    marginLeft: 30,
    marginTop: 30,
    marginBottom: 20,
    fontWeight: "bold",
  },
  searchContainer: {
    display: "flex",
  },
});

interface MusicProps {
  album: Album;
  artists: Artist[];
  id: string;          
  name: string;      
  uri: string;
}

interface Album {
  images: Image[];
  name: string;
}

interface Image {
  url: string;
}

interface Artist {
  name: string;
}

const LandingComponent: React.FC = () => {
  const token = localStorage.getItem("token");
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [trackSelect, setSelectedTrack] = useState<string[]>([]);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const classes = useStyles();

  const getQuery = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const auth = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .get(`https://api.spotify.com/v1/search?q=${search}&type=track`, auth)
      .then((response) => {
        console.log(response.data.tracks.items);
        setResult(response.data.tracks.items);
      });
  };

  const handleSearch = (query: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(query.target.value);
  };

  const handleSelect = (id: string) => {
    setSelectedTrack([...trackSelect, id]);
  };

  const handleDeselect = (id: string) => {
    const selectedTrack = trackSelect.filter((track) => track !== id);
    setSelectedTrack([...selectedTrack]);
  };

  const getUserId = async () => {
    try {
      const response = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      setUserId(response.data.id);
      setProfilePic(response.data.images[0].url);
      setUserName(response.data.display_name);
    } catch (error) {
      console.error(error);
    }
  };

  getUserId();

  return (
    <div>
      <div className="grid-playlist">
        <div>
          <Typography className={classes.textH4} variant="h4">
            Create Playlist
          </Typography>
          <FormPlaylistComponent
            userId={userId}
            token={`Bearer ${token}`}
            data={trackSelect}
          />
        </div>
        <div className="user-container">
          <UserComponent userName={userName} profilePic={profilePic} />
        </div>
      </div>
      <Container maxWidth={false} disableGutters>
        <form noValidate autoComplete="off" onSubmit={getQuery}>
          <Typography className={classes.textH4} variant="h4">
            Search
          </Typography>
          <Container
            maxWidth={false}
            disableGutters
            className={classes.searchContainer}
          >
            <TextField
              className={classes.textField}
              type="text"
              variant="filled"
              color="primary"
              label="Search Song"
              onChange={handleSearch}
              data-testid="search-bar"
            />
            <Button
              className={classes.btnSearch}
              onClick={getQuery}
              color="primary"
              variant="contained"
              size="large"
              endIcon={<SearchIcon />}
            >
              Search
            </Button>
          </Container>
        </form>
      </Container>
      <div className="card-music">
        {result.map((music: MusicProps) => (
          <CardComponent
            key={music.id}
            image_url={music.album.images[1].url}
            title={music.name}
            artist={music.artists[0].name}
            album={music.album.name}
            selected={trackSelect.some((id) => id === music.uri)}
            onSelect={() => handleSelect(music.uri)}
            onDeselect={() => handleDeselect(music.uri)}
          />
        ))}
      </div>
    </div>
  );
};

export default LandingComponent;
