import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/AddCircle";
import RemoveIcon from "@material-ui/icons/RemoveCircle";

const useStyles = makeStyles({
  btnSelect: {},
});

function index(props) {
  const { selected, onSelect, onDeselect } = props;
  const value = selected ? "Deselect" : "Select";
  const classes = useStyles();

  return (
    <Button
      value={selected ? "Deselect" : "Select"}
      onClick={selected ? onDeselect : onSelect}
      className={classes.btnSelect}
      variant="contained"
      size="large"
      color={selected ? "secondary" : "primary"}
      endIcon={selected ? <RemoveIcon /> : <AddIcon />}
    >
      {value}
    </Button>
  );
}

export default index;
