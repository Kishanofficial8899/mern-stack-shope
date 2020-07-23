import React from 'react';

//SETTING UP ROUTER
import { Route, Switch } from 'react-router-dom';

// All the component

import Auth from '../hoc/auth';

import Navbar from './views/Navbar/Navbar';
import Login from './views/LoginPage/Login';
import Register from './views/RegisterPage/Register';
import LandingPage from './views/LandingPage/LandingPage';
import UploadProduct from './views/UploadProductPage/UploadProduct';
import SingleProduct from './views/SingleProduct/SingleProduct';
import Cart from './views/CartPage/Cart';
import HistoryPage from './views/historyPage/historyPage';
import UserProfile from './views/UserProfile/UserProfile';

import '../index.css';

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

const App = () => {
  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path='/' component={Auth(LandingPage, null)} />
          <Route path='/login' exact component={Auth(Login, false)} />
          <Route path='/register' exact component={Auth(Register, false)} />
          <Route
            path='/upload/product'
            exact
            component={Auth(UploadProduct, true)}
          />
          <Route
            path='/product/:productId'
            exact
            component={Auth(SingleProduct, null)}
          />
          <Route exact path='/user/cart' component={Auth(Cart, true)} />
          <Route exact path='/history' component={Auth(HistoryPage, true)} />
          <Route
            exact
            path='/user/account'
            component={Auth(UserProfile, true)}
          />
        </Switch>
      </div>
    </div>
  );
};

export default App;
