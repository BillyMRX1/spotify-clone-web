import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  textH4: {
    marginBottom: 20,
    marginTop: 20,
    fontWeight: "bold",
  },
});

const HeaderComponent = () => {
  const classes = useStyles();

  return (
    <div>
      <Typography className={classes.textH4} align="center" variant="h4">
        Spotify Clone
      </Typography>
    </div>
  );
};

export default HeaderComponent;
