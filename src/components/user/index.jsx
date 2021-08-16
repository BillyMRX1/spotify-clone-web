import {
  Typography,
  makeStyles,
  Avatar,
  Container,
  Button
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles({
  textH4: {
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 20
  },
  profilePic: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 30,
    height: 150,
    width: 150
  },
  btnLogout: {
    display: 'flex',
    marginLeft: 'auto',
    marginRight: 'auto',
    '&:hover': {
      backgroundColor: 'green'
    }
  }
});

const UserComponent = (props) => {
  const classes = useStyles();

  const handleLogout = () => {
    localStorage.clear();
    localStorage.setItem('token', ' ');
    window.location.href = '/';
  };
  return (
    <Container disableGutters>
      <Avatar
        className={classes.profilePic}
        alt="Profile Pic"
        src={props.profilePic}
      />
      <Typography className={classes.textH4} variant="h4">
        Hello {props.userName}!
      </Typography>
      <Button
        className={classes.btnLogout}
        onClick={handleLogout}
        color="primary"
        variant="contained"
        size="large"
        endIcon={<ExitToAppIcon />}
      >
        Logout
      </Button>
    </Container>
  );
};

export default UserComponent;
