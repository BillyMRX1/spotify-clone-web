import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import "./style.css";

const useStyles = makeStyles({
  text: {
    marginTop: 10,
    marginBottom: 10,
  },
});

function index(props) {
  const { artist, album } = props;
  const classes = useStyles();
  return (
    <div>
      <Typography className={classes.text}>{artist}</Typography>
      <Typography className={classes.text}>{album}</Typography>
    </div>
  );
}

export default index;
