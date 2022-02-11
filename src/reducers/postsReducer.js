import { CLEAR_POST, CREATE_POST, DELETE_POST, END_LOADING, FETCH_ALL_POST, FETCH_BY_SEARCH, FETCH_POST, LIKE_POST, START_LOADING, UPDATE_POST } from "../types";
const initialState = {
    posts: [],
    post: {},
    loading: true,
    currentPage: 1,
    numberOfPages: 1
}
const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case START_LOADING:
            return {...state, loading: true}
        case END_LOADING:
            return {...state, loading: false}
        case FETCH_ALL_POST:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            }
        case CLEAR_POST:
            return {
                ...state,
                post: {}
            }
        case FETCH_BY_SEARCH:
            return {
                ...state,
                posts: action.payload,
            }
        case FETCH_POST:
            return {
                ...state,
                post: action.payload,
            }
        case CREATE_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts],
            }
        case LIKE_POST:
        case UPDATE_POST:
            return {
                ...state,
                posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post),
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter((post) => post._id !== action.payload),
            }
        default:
            return state
    }
}

export default postsReducer