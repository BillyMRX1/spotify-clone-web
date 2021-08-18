import '../../components/button/style.css';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Container from '@material-ui/core/Container';
import Background from '../../assets/background-login.png';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  btnLogin: {
    '&:hover': {
      backgroundColor: 'green'
    },
    marginTop: 40
  },
  containerLogin: {
    display: 'flex',
    position: 'relative',
    maxHeight: window.innerHeight,
    minHeight: '80vh',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  text: {
    fontWeight: 'bold'
  }
});

interface LoginProps {
  auth_link: string;
}

const LoginPage: React.FC<LoginProps> = (props: LoginProps) => {
  const classes = useStyles();

  return (
    <Container
      className={classes.containerLogin}
      disableGutters
      maxWidth={false}
    >
      <div className="login-background">
        <img className="login-image" src={Background} alt="background" />
      </div>
      <div className="login-content">
        <Typography className={classes.text} variant="h1" color="primary">
          Create Playlist
        </Typography>
        <Typography className={classes.text} variant="h4" color="primary">
          Anytime, Anywhere~
        </Typography>
        <Button
          className={classes.btnLogin}
          variant="contained"
          size="large"
          color="primary"
          href={props.auth_link}
          endIcon={<ExitToAppIcon />}
        >
          Login
        </Button>
      </div>
    </Container>
  );
};

export default LoginPage;
