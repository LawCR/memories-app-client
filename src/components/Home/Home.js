import React, { useState } from 'react';
import { AppBar, Button, Container, Grid, Grow, Paper, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import useStyles from './styles';

import { getPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Paginate from '../Pagination/Paginate';
import { useLocation, useNavigate } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const Home = () => {
    const classes = useStyles()
    const [currentId, setCurrentId] = useState(0);
    const [search, setSearch] = useState("");
    const [tags, setTags] = useState([]);

    // const loading = useSelector(state => state.auth.loading)
    // const loadingPost = useSelector(state => state.posts.loading)
    const dispatch = useDispatch()
    
    const query = useQuery()
    const navigate = useNavigate()
    const page = query.get('page') || 1
    const searchQuery = query.get('searchQuery')

    // useEffect(() => {
    //   dispatch(getPosts())
    // }, [currentId, dispatch, loading, loadingPost]);

    const searchPost = (e) => {
      e.preventDefault()
      if (search.trim() || tags.length > 0 ) {
        dispatch(getPostsBySearch({ search, tags: tags.join(',') }))
        navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',') || 'none'}`)
      } else {
        navigate('/')
      }
    }

    const handleKeyPress = (e) => {
      if (e.which === 13) {
        // search post
        searchPost()
      }
    }

    const handleAdd = (tag) => setTags([ ...tags, tag ])
    
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete))
    
    
    return (
        <Grow in>
            <Container maxWidth="xl">
              <Grid className={classes.gridContainer} container  justifyContent="space-between" alignItems="stretch" spacing={3}>
                <Grid item xs={12} sm={6} md={9}>
                  <Posts setCurrentId={setCurrentId} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <AppBar className={classes.appBarSearch} position="static" color='inherit'>
                      <TextField 
                        name="search" 
                        variant='outlined' 
                        label="Search Memories" 
                        onKeyPress={handleKeyPress}
                        value={search}
                        onChange={(e) => {setSearch(e.target.value)}}
                        fullWidth
                      />
                      <ChipInput 
                        style={{margin: '10px 0'}}
                        value={tags}
                        onAdd={handleAdd}
                        onDelete={handleDelete}
                        label="Search Tags"
                        variant='outlined'
                      />
                      <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                  </AppBar>
                  <Form currentId={currentId} setCurrentId={setCurrentId}/>
                  {(!searchQuery && !tags.length) && (
                      <Paper elevation={6} className={classes.pagination}>
                          <Paginate page={page} />
                      </Paper>
                  )}
                </Grid>
              </Grid>
            </Container>
        </Grow>
    );
};

export default Home;
