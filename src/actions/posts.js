import * as api from '../api'
import { CLEAR_POST, CREATE_POST, DELETE_POST, END_LOADING, FETCH_ALL_POST, FETCH_BY_SEARCH, FETCH_POST, LIKE_POST, START_LOADING, UPDATE_POST } from '../types'

// Action para listar los Posts
export const getPosts = (page) => async(dispatch) => {
    try {
        dispatch({type: START_LOADING})
        const { data } = await api.fetchPosts(page)
        dispatch({type: FETCH_ALL_POST, payload: data})
        dispatch({type: END_LOADING})
        dispatch({type: CLEAR_POST})
    } catch (error) {
        console.log(error.message);
    }
}

// Action para obtener la data de un post
export const getPost = (id) => async(dispatch) => {
    try {
        dispatch({type: START_LOADING})
        const { data } = await api.fetchPost(id) 
        dispatch({type: FETCH_POST, payload: data})
        dispatch({type: END_LOADING})
    } catch (error) {
        console.log(error.message);
    }
}

// Action para listar los Posts por busqueda
export const getPostsBySearch = (searchQuery) => async(dispatch) => {
    try {
        dispatch({type: START_LOADING})
        const { data: {data} } = await api.fetchPostsBySearch(searchQuery) 
        dispatch({type: FETCH_BY_SEARCH, payload: data})
        dispatch({type: END_LOADING})
    } catch (error) {
        console.log(error.message);
    }
}

// Action para crear Posts
export const createPost = (post,navigate) => async(dispatch) => {
    try {
        dispatch({type: START_LOADING})
        const { data } = await api.createPost(post)
        navigate(`/posts/${data._id}`)
        dispatch({type: CREATE_POST, payload: data})
        dispatch({type: END_LOADING})
    } catch (error) { 
        console.log(error.message);
    }
}

// Action para actualizar Posts
export const updatePost = (id, post) => async(dispatch) => {
    try {
        const { data } = await api.updatePost(id, post)
        dispatch({type: UPDATE_POST, payload: data})
    } catch (error) { 
        console.log(error.message);
    }
}

// Action para eliminar Posts
export const deletePost = (id) => async(dispatch) => {
    try {
        await api.deletePost(id)
        dispatch({ type: DELETE_POST, payload: id})
    } catch (error) { 
        console.log(error.message);
    }
}

// Action para actualizar Posts
export const likePost = (id) => async(dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    try {
        const { data } = await api.likePost(id, user?.token);
        dispatch({ type: LIKE_POST, payload: data})
    } catch (error) { 
        console.log(error.message);
    }
}