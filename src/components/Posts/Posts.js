import React from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress, Grid } from '@material-ui/core';
import Post from './Post/Post';
import useStyles from './styles';
const Posts = ({setCurrentId}) => {
  const classes = useStyles()

  const {posts, loading} = useSelector((state) => state.posts)
  // Si no hay posts y no esta cargando entonces mostrar ese msj
  if(!posts.length && !loading) return 'No hay posts actualmente, crea uno.'
  return (
    loading ? <div className={classes.spinnerProgress}><CircularProgress size="5em" /></div>
    : 
    (
      <Grid className={classes.container} container alignItems='stretch' spacing={3} >
          {
            posts.map((post) => (
              <Grid item key={post._id} xs={12} sm={12} md={6} lg={3} >
                  <Post post={post} setCurrentId={setCurrentId} />
              </Grid>
            ))
          }
      </Grid>
    )
  );

};

export default Posts;
