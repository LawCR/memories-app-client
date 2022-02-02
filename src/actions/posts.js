import * as api from '../api'
import { CREATE_POST, DELETE_POST, FETCH_ALL_POST, LIKE_POST, LOADING, LOADING_EXITO, UPDATE_POST } from '../types'

// Action para listar los Posts
export const getPosts = () => async(dispatch) => {

    try {
        const { data } = await api.fetchPosts()
        const action = { type: FETCH_ALL_POST, payload: data}
        dispatch(action)
    } catch (error) {
        console.log(error.message);
    }
}

// Action para crear Posts
export const createPost = (post) => async(dispatch) => {
    try {
        
        const { data } = await api.createPost(post)

        const action = { type: CREATE_POST, payload: data}
        dispatch(action)
    } catch (error) { 
        console.log(error.message);
    }
}

// Action para actualizar Posts
export const updatePost = (id, post) => async(dispatch) => {
    try {
        dispatch({type: LOADING})
        const { data } = await api.updatePost(id, post)
        const action = { type: UPDATE_POST, payload: data}
        dispatch(action)
        dispatch({type: LOADING_EXITO})
    } catch (error) { 
        console.log(error.message);
    }
}

// Action para eliminar Posts
export const deletePost = (id) => async(dispatch) => {
    try {
        await api.deletePost(id)
        const action = { type: DELETE_POST, payload: id}
        dispatch(action)
    } catch (error) { 
        console.log(error.message);
    }
}

// Action para actualizar Posts
export const likePost = (id) => async(dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    try {
        const { data } = await api.likePost(id, user?.token);
        const action = { type: LIKE_POST, payload: data}
        dispatch(action)
    } catch (error) { 
        console.log(error.message);
    }
}