import React, { useEffect, useState } from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import memories from '../../images/memories.png';
import memoriesText from '../../images/memories-Text.png';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { LOGOUT, LOGOUT_LOADING } from '../../types';
import decode from 'jwt-decode';

const Navbar = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const logout = () => {
        dispatch({type: LOGOUT_LOADING})
        dispatch({type: LOGOUT})
        navigate('/')
        setUser(null)
    }
    
    useEffect(() => {
        const token = user?.token;
    
        if (token) {
          const decodedToken = decode(token);
    
          if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
    
        setUser(JSON.parse(localStorage.getItem('profile')));
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [location]);
    
    
    
    // TODO: Recordar meterle un colorsito a los nombres c:
    const nombreCompleto = (user?.result.name.split(' ').length >= 3) ? user?.result.name.split(' ')[0] + " " + user?.result.name.split(' ')[2] : user?.result.name
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to="/" className={classes.brandContainer}>
                {/* <Typography className={classes.heading} component={Link} to="/" variant="h2" align="center">MyMemories</Typography> */}
                <img src={memoriesText} alt="icon" height="45px" />
                <img className={classes.image} src={memories} alt="icon" height="40px" />
            </Link>
            <Toolbar className={classes.toolbar}>
                {user 
                    ? 
                    (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
                                {user.result.name.charAt(0)}
                            </Avatar>
                            <Typography className={classes.userName} variant="h6">{nombreCompleto}</Typography>
                            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout} >Logout</Button>
                        </div>
                    )
                    : (
                        <Button component={Link} to="/auth" variant='contained' color="primary" >Iniciar Sesión</Button>
                    )
                }
            </Toolbar>
        </AppBar>
    )
};

export default Navbar;
