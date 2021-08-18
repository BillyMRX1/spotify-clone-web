import { Container, makeStyles } from '@material-ui/core';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import UserComponent from '../../components/user';

const useStyles = makeStyles({
  profileContainer: {
    display: 'flex',
    position: 'relative',
    maxHeight: window.innerHeight,
    minHeight: '80vh',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }
});

const ProfilePage: React.FC = () => {
  const classes = useStyles();

  const token = localStorage.getItem('token');
  const [userName, setUserName] = useState('');
  const [profilePic, setProfilePic] = useState('');

  useEffect(() => {
    const getUserDetail = async () => {
      try {
        const response = await axios.get('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        });
        setProfilePic(response.data.images[0].url);
        setUserName(response.data.display_name);
      } catch (error) {
        console.error(error);
      }
    };

    getUserDetail();
  }, []);

  return (
    <Container className={classes.profileContainer} disableGutters>
      <UserComponent userName={userName} profilePic={profilePic} />
    </Container>
  );
};

export default ProfilePage;
