import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: 'center',
  },
  spinnerProgress: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  }
}));