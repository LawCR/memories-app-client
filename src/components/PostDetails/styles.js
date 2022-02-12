import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
    maxHeight: '600px',
  },
  mediaItem: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
    maxHeight: '320px',
    [theme.breakpoints.down('sm')]: {
      maxHeight: '280px',
    },
  },
  containerTag: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tags: {
    backgroundColor: "#D4E6F1",
    marginRight: "3px",
    padding: "3px 6px",
    borderRadius: "15px"
  },
  card: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  },
  imageSection: {
    marginLeft: '20px',
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  message: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  containerLike: {
    // padding: '0 16px 8px 5px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  tituloh5: {
    marginBottom: "20px",
  },
  recommendedPosts: {
    
  },
  recommendedPostItem: {
    cursor: 'pointer',
    border: "1px solid lightgray",
    borderRadius: "20px",
  },
  loadingPaper: {
    display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: '20px', 
    borderRadius: '15px', 
    height: '39vh',
  },
}));