import '../../components/button/style.css';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  btnLogin: {
    '&:hover': {
      backgroundColor: 'green',
    },
  },
  containerLogin: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const LoginPage = (props) => {
  const classes = useStyles();

  return (
    <Container className={classes.containerLogin}>
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
    </Container>
  );
};

export default LoginPage;
