import * as api from '../api'
import { AUTH_SIGNIN, AUTH_SIGNUP } from '../types'

// Action para login 
export const signin = (formData, navigate) => async(dispatch) => {
    try {
        const { data } = await api.signIn(formData)
        dispatch({type: AUTH_SIGNIN, data})
        navigate('/')
    } catch (error) {
        console.log(error);
    }
}

// Action para registrarse
export const signup = (formData, navigate) => async(dispatch) => {
    try {
        const { data } = await api.signUp(formData)
        dispatch({type: AUTH_SIGNUP, data})

        navigate('/')
    } catch (error) {
        console.log(error);
    }
}