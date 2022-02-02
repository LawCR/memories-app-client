// Config de redux
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// Reducers
import reducers from './reducers'

const store = createStore(
    reducers, 
    compose(applyMiddleware(thunk), 
    // Codigo para utilizar redux developer tools
        typeof window === 'object' && 
        typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'  
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f
    )
    
    )

export default store