import * as api from '../api'
import { CREATE_POST, DELETE_POST, FETCH_ALL_POST, LIKE_POST, UPDATE_POST } from '../types'

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
export const updatePost = (id, updatedPost) => async(dispatch) => {
    try {
        const { data } = await api.updatePost(id, updatedPost)
        const action = { type: UPDATE_POST, payload: data}
        dispatch(action)
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
    try {
        const { data } = await api.likePost(id)
        const action = { type: LIKE_POST, payload: data}
        dispatch(action)
    } catch (error) { 
        console.log(error.message);
    }
}