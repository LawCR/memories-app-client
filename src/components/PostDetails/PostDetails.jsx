import { CircularProgress, Divider, Grid, Paper, Typography } from '@material-ui/core';
import moment from 'moment';
import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getPost, getPostsBySearch } from '../../actions/posts';
import useStyles from './styles';
const PostDetails = () => {
    const classes = useStyles()
    const { post, posts, loading } = useSelector((state) => state.posts)
    const { id } = useParams()
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getPost(id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    useEffect(() => {
        if (Object.keys(post).length > 0) {
          dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [post])

    if(Object.keys(post).length === 0) return null


    if (loading) {
        return (
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress size="7em" />
            </Paper>
        )
    }

    const recommendedPosts = posts.filter(({_id}) => _id !== post._id)

    const openPost = (id) => navigate(`/posts/${id}`)

    return (
        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant="h4" style={{fontWeight: 'bold', textAlign: 'center'}} component="h2">{post.title}</Typography>
                    <Divider className={classes.tituloh5} />
                    <div className={classes.containerTag}>
                        {
                            post.tags.map((tag) => (
                                <Typography gutterBottom className={classes.tags} variant="h6" color="textSecondary" component="span" key={tag}>{`#${tag}`}</Typography>
                            ))
                        }
                    </div>
                    <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
                        <Typography variant="h6">Created by: <span style={{fontWeight: 'bold'}}>{post.name}</span></Typography>
                    <div className={classes.containerLike}>
                        <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                        <Typography gutterBottom color='primary' variant="subtitle1">Likes: {post.likes.length}</Typography>
                    </div>
                    {/* <Divider style={{ margin: '20px 0' }} />
                    <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
                    <Divider style={{ margin: '20px 0' }} /> */}
                </div>
                <div className={classes.imageSection}>
                    <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
                </div>
            </div>
            {
                recommendedPosts.length && (
                    <div className={classes.section}>
                        <Typography gutterBottom variant="h6" style={{fontWeight: 'bold'}} >Podrían tambien gustarte:</Typography>
                        <Divider className={classes.tituloh5} />
                        <Grid container alignItems='stretch' spacing={3} className={classes.recommendedPosts} >
                        {
                            recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
                                <Grid item xs={12} sm={12} md={6} lg={3} className={classes.recommendedPostItem} onClick={() => openPost(_id)} key={_id}>
                                    <Typography gutterBottom style={{fontWeight: 'bold', textAlign: 'center'}} variant="h6">{title}</Typography>
                                    <Typography gutterBottom variant="subtitle2">{name}</Typography>
                                    <Typography gutterBottom className={classes.message} variant="subtitle2">{message}</Typography>
                                    <Typography gutterBottom color='primary' variant="subtitle1">Likes: {likes.length}</Typography>
                                    <img src={selectedFile} width="100%" className={classes.mediaItem} alt={title} />
                                </Grid>
                            ))
                        }
                        </Grid>
                    </div>
                )
            
            }
        </Paper>
    );
};

export default PostDetails;
