import { AUTH_GOOGLE, AUTH_SIGNIN, AUTH_SIGNUP, GET_USER, LOGOUT, LOGOUT_LOADING } from "../types";

const initialState = {
    authData: null,
    loading: false,
}
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_SIGNIN:
        case AUTH_SIGNUP:
        case AUTH_GOOGLE:
            localStorage.setItem('profile', JSON.stringify({...action?.data}))
            return {...state, authData: action?.data?.result, loading: false, errors: null}

        case LOGOUT_LOADING:
            return {...state, loading: true, errors: null}
        case GET_USER:
            const user = JSON.parse(localStorage.getItem('profile'))?.result
            return {...state, authData: user, loading: false, errors: null}
        case LOGOUT:
            localStorage.removeItem('profile')
            return {...state, authData: null, loading: false, errors: null}
        default:
            return state;
    }
}

export default authReducer