import { AUTH_GOOGLE, AUTH_SIGNIN, AUTH_SIGNUP, LOGOUT, LOGOUT_LOADING } from "../types";

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
            return {...state, authData: action?.data, loading: false, errors: null}

        case LOGOUT_LOADING:
            return {...state, loading: true, errors: null}
        case LOGOUT:
            localStorage.removeItem('profile')
            return {...state, authData: null, loading: false, errors: null}
        default:
            return state;
    }
}

export default authReducer