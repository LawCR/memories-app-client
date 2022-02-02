import axios from "axios";

const API = axios.create({baseURL: 'https://makingmemories-app.herokuapp.com/api'})
// const API = axios.create({baseURL: 'http://localhost:8081/api'})


API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

// Para listar los post
export const fetchPosts = () => API.get('/posts')

// Para crear un post
export const createPost = (newPost) => API.post('/posts', newPost)

// Para actualizar un post
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost)

// Para eliminar un post
export const deletePost = (id) => API.delete(`/posts/${id}`)

// Para actualizar el like
export const likePost = (id) => API.patch(`/posts/${id}/likePost`)

// AUTH Sign in
export const signIn = (formData) => API.post(`/users/signin`, formData)

// AUTH Sign up
export const signUp = (formData) => API.post(`/users/signup`, formData)