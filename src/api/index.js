import axios from "axios";

// const urlDesarrollo = 'http://localhost:8081/api/posts'
const url = 'https://makingmemories-app.herokuapp.com/api/posts'


// Para listar los post
export const fetchPosts = () => axios.get(url)

// Para crear un post
export const createPost = (newPost) => axios.post(url, newPost)

// Para actualizar un post
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost)

// Para eliminar un post
export const deletePost = (id) => axios.delete(`${url}/${id}`)

// Para actualizar el like
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`)