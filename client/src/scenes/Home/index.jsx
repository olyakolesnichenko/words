import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import MainPage from '../MainPage';
import { store } from '../../store';
import { toast } from 'react-toastify';

toast.configure({
  position: 'top-center',
  autoClose: 4000,
  hideProgressBar: true,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnVisibilityChange: true,
  draggable: true,
  pauseOnHover: true
});

const Home = () => (
  <Provider store={store}>
    <Router>
      <MainPage />
    </Router>
  </Provider>
);

export default Home;
