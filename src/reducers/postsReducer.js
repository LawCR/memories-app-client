import { CREATE_POST, DELETE_POST, FETCH_ALL_POST, LIKE_POST, LOADING, LOADING_EXITO, UPDATE_POST } from "../types";
const initialState = {
    posts: [],
    loading: false
}
const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING:
            return {...state, loading: true}
        case LOADING_EXITO:
            return {...state, loading: false}
        case FETCH_ALL_POST:
            return {
                ...state,
                posts: action.payload,
            }
        case CREATE_POST:
            return {
                ...state,
                posts: [...state.posts, action.payload],
            }
            // return [
            //     ...state,
            //     action.payload
            // ]
        case LIKE_POST:
        case UPDATE_POST:
            return {
                ...state,
                posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post),
            }
            // return state.map((post) => post._id === action.payload._id ? action.payload : post)
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter((post) => post._id !== action.payload),
            }
            // return state.filter((post) => post._id !== action.payload)
        default:
            return state
    }
}

export default postsReducer