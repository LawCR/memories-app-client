import React, { useState } from 'react';
import { Button, ButtonBase, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import useStyles from './styles';

import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import { useNavigate } from 'react-router-dom';


const Post = ({post, setCurrentId}) => {
    const classes = useStyles()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'));
    
    // Variables y Estados
    const [likes, setLikes] = useState(post?.likes)
    const userId = user?.result?.googleId || user?.result?._id
    const hasLikedPost = post.likes.find((like) => like === userId)

    // Función like para acelerar el proceso de dar like
    const handleLike = async() => {
        dispatch(likePost(post._id))
        if(hasLikedPost) {
            // Si le da dislike
            setLikes(post.likes.filter((id) => id !== userId))
        } else {
            // Si le da Like
            setLikes([...post.likes, userId])
        }
    }

    const Likes = () => {
    if (likes.length > 0) {
        return likes.find((like) => like === userId)
        ? (
            <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `Tú y ${likes.length - 1} más` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
        ) : (
            <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    const openPost = () => navigate(`/posts/${post._id}`)

    

    return (
        <Card className={classes.card} raised elevation={6}>
            <ButtonBase className={classes.cardAction} onClick={openPost}>
                <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
                <div className={classes.overlay}>
                    <Typography variant="h6">{post.name}</Typography>
                    <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                </div>
            </ButtonBase>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                <div className={classes.overlay2}>
                    <Button 
                        style={{color: 'white'}} 
                        size='small' 
                        onClick={() => setCurrentId(post._id)} >
                        <MoreHorizIcon fontSize='medium' />
                    </Button>
                </div>
                )}
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
                <CardContent className={classes.cardContent}>
                    <Typography className={classes.cardDescripcion} variant="body2" color="textSecondary" component="p">{post.message}</Typography>
                </CardContent>
            
            <CardActions className={classes.cardActions}>
                <Button size='small' color='primary' disabled={!user?.result} onClick={handleLike}>
                    <Likes />   
                </Button>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                <Button size='small' color='secondary' onClick={() => dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize='small' />
                    Eliminar
                </Button>
                )}
            </CardActions>
        </Card>
    )
};

export default Post;
