import { Container } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import PostDetails from './components/PostDetails/PostDetails';
import { GET_USER } from './types';





const Memory = () => {
    
    // const user = JSON.parse(localStorage.getItem('profile'))
    // TODO: No olvidar hacer que en nuestro redux se mantenga el usuario y no se borre al recargar o que se vuelva a llenar despues de cargar
    const user = useSelector(state => state.auth.authData)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({ type: GET_USER})
    }, [dispatch]);
    
    return (
        <BrowserRouter>
            <Container maxWidth="xl">
                <Navbar />
                <Routes>
                  <Route path="/" element={ <Navigate to="/posts" /> } />
                  <Route path="/posts" element={ <Home /> } />
                  <Route path="/posts/search" element={ <Home /> } />
                  <Route path="/posts/:id" element={ <PostDetails /> } />

                  <Route path="/auth" element={ !user ? <Auth /> : <Navigate to="/posts" /> } />
                </Routes>
              
            </Container>
        </BrowserRouter>
    )
};

export default Memory;
