import React, { useEffect, useState } from 'react';
import { Container, Grid, Grow } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';

import { getPosts } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
const Home = () => {
    const classes = useStyles()

    const [currentId, setCurrentId] = useState(0);
    const loading = useSelector(state => state.auth.loading)
    const loadingPost = useSelector(state => state.posts.loading)
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(getPosts())
    }, [currentId, dispatch, loading, loadingPost]);

    return (
        <Grow in>
            <Container>
              <Grid className={classes.mainContainer} container  justifyContent="space-between" alignItems="stretch" spacing={3}>
                <Grid item xs={12} sm={7}>
                  <Posts setCurrentId={setCurrentId} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Form currentId={currentId} setCurrentId={setCurrentId}/>
                </Grid>
              </Grid>
            </Container>
        </Grow>
    );
};

export default Home;
