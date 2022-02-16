import { Button, TextField, Typography } from '@material-ui/core'
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { commentPost } from '../../actions/posts'

import useStyles from './styles'

const CommentSection = ({post}) => {
    const classes = useStyles()
    const [comments, setComments] = useState(post?.comments)
    const [comment, setComment] = useState("")

    const user = useSelector(state => state.auth.authData)
    const dispatch = useDispatch()
    const commentsRef = useRef()

    const handleClick = async() => {
        const finalComment = `${user.name}: ${comment}`
        const newComments = await dispatch(commentPost(finalComment, post._id))  
        setComments(newComments)
        setComment("")

        commentsRef.current.scrollIntoView({ behavior: 'smooth'})
    }
    return (
        <div>
            <div className={classes.commentsOuterContainer}>  
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant='h6'>Comentarios</Typography>
                    {
                        comments?.map((c, i) => (
                            <Typography key={i} gutterBottom variant="subtitle1" component="h6">
                              <strong>{c.split(': ')[0]}: </strong>  
                              {c.split(': ')[1]}
                            </Typography>
                        ))
                    }
                    {
                        comments?.length === 0 && (
                            <Typography variant="subtitle1" component="h6">Sé el primero en comentar</Typography>
                        )

                    }
                    <div ref={commentsRef} />
                </div>
                {
                    user?.name && (
                        <div className={classes.commentsInputContainer}>
                            <Typography gutterBottom variant='h6'>Escribe un comentario</Typography>
                            <TextField 
                                fullWidth
                                rows={4}
                                variant="outlined"
                                label="Comentario"
                                multiline
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <Button style={{marginTop: '10px'}} fullWidth disabled={!comment} variant="contained" color='primary' onClick={handleClick}>
                                Comentar
                            </Button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default CommentSection