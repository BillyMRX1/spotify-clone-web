import { Typography } from "@material-ui/core";
import "./style.css";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  textH6: {
    fontWeight: "bold",
    marginTop: 10,
  },
});

interface TitleProps{
  title: string
}

const TitleComponent: React.FC<TitleProps> = (props: TitleProps) => {
  const classes = useStyles();
  return (
    <Typography className={classes.textH6} variant="h6" data-testid="display-title">
      {props.title}
    </Typography>
  );
}

export default TitleComponent;
