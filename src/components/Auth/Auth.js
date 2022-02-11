import React, { useState } from 'react';


import {GoogleLogin} from 'react-google-login';
import { Avatar, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import useStyles from './styles';
import Icon from './Icon';
import { useDispatch } from 'react-redux';
import { AUTH_GOOGLE } from '../../types';
import { useNavigate } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';
const Auth = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (isSignup) {
            dispatch(signup(formData, navigate))
        } else {
            dispatch(signin(formData, navigate))
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    // Para mostrar el password
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    // Para cambiar entre Login y Registro
    const switchMode = () => {
        setIsSignup(!isSignup)
        setShowPassword(false)
    }

    // Función de exito o fail al Google Sign
    const googleSuccess = async(res) => {
        const result = res?.profileObj
        const token = res?.tokenId
        try {
            dispatch({type: AUTH_GOOGLE, data: {result, token}})
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }
    const googleFailure = (error) => {
        console.log('Google SignIn tuvo un error, Inténtelo denuevo más tarde');
    }
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                
                <Typography variant='h5'>{isSignup ? 'Crear una Cuenta' : 'Iniciar Sesión'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name='firstName' label="Nombre" handleChange={handleChange} autoFocus half />
                                    <Input name='lastName' label="Apellido" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name='email' label="Email" type="email" handleChange={handleChange} />
                        <Input name='password' label="Password" type={showPassword ? "text" : "password"} handleChange={handleChange} handleShowPassword={handleShowPassword} />
                        {
                            isSignup && <Input name="confirmPassword" label="Confirmar Password" type="password" handleChange={handleChange} />
                        }
                    </Grid>
                    <Button className={classes.submit} type='submit' fullWidth variant='contained' color="primary" >
                        {isSignup ? "Registrar" : "Ingresar"}
                    </Button>
                    {/* Secret Client:  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 */}
                    <GoogleLogin 
                        clientId={process.env.REACT_APP_GOOGLE_URL}
                        render={(renderProps) => (
                            <Button 
                                className='classes.googleButton' 
                                color='primary' variant='contained' fullWidth
                                onClick={renderProps.onClick} 
                                disabled={renderProps.disabled} 
                                startIcon={<Icon />} 
                            >Google SignIn</Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy='single_host_origin'
                    />
                    <Grid container justifyContent='flex-end'>
                        <Grid item >
                            <Button onClick={switchMode}>
                                {
                                    isSignup ? 'Ya tienes una cuenta? Inicia sesión' : 'No tienes una cuenta? Registrate'
                                }
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;
