import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './core/components/Navbar';
import Admin from './pages/Admin';
import Catalog from './pages/Catalog';
import Producttails from './pages/Catalog/components/ProductDetails';
import Home from './pages/Home';
import Auth from './pages/Auth';
import history from './core/Utils/history';

const Routes = () => (
<Router history={history}>
    <Navbar />
    <Switch>
        <Route path="/" exact>
            <Home /> 
        </Route>
        <Route path="/products" exact>
            <Catalog />
        </Route>
        <Route path="/products/:productId">
            <Producttails />
        </Route>
        <Redirect from="/auth" to="/auth/login" exact/>
        <Route path="/auth">
            <Auth />
        </Route>
        <Redirect from="/admin" to="/admin/products" exact/>
        <Route path="/admin">
            <Admin />
        </Route>
    </Switch>
</Router>
);

export default Routes;