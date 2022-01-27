import React from 'react';
import { Provider } from 'react-redux';
import Memory from './Memory';
import store from './store';
// import useStyles from './styles';



const App = () => {
  // const classes = useStyles()
  return (
    <>
      <Provider store={store}>
          <Memory />
      </Provider>
    </>
  )
};

export default App;
