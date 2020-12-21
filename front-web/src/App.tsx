import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './core/assets/styles/custom.scss';
import './app.scss';
import Routes from './Routes';

const App = () => {
  return (    
    <React.Fragment>   
      <Routes />
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;