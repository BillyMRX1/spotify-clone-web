import { Typography } from "@material-ui/core";
import "./style.css";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  textH6: {
    fontWeight: "bold",
    marginTop: 10,
  },
});

function index(props) {
  const classes = useStyles();
  return (
    <Typography className={classes.textH6} variant="h6">
      {props.title}
    </Typography>
  );
}

export default index;
