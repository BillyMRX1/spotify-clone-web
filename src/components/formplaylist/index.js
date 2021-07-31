import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

const FormPlaylistComponent = (props) => {
  const { userId, data } = props;
  const token = `Bearer ${useSelector((state) => state.token.token)}`;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const minimumTitle = 10;
  const minimumDescription = 20;

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
    if (title.length < minimumTitle) {
      alert("Minimum Title 10 Character");
    } else if (description.length < minimumDescription) {
      alert("Minimum Description 20 Character");
    } else {
      submitPlaylist();
      alert("Playlist Created!");
    }
  };

  return (
    <div>
      <form>
        <h3>Title:</h3>
        <input
          type="text"
          className="search_bar"
          onChange={handleTitle}
        ></input>
        <h3>Description:</h3>
        <input
          type="text"
          className="search_bar"
          onChange={handleDescription}
        ></input>
        <button onClick={handleSubmit} className="btn">
          Create
        </button>
      </form>
    </div>
  );
};

export default FormPlaylistComponent;
