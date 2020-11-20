  import React from 'react';
  import { Route, Switch } from 'react-router-dom'
import List from './List';
import Form from './Form';

const Products = () => {
    return (
        <div>
            <Switch>
                <Route path="/admin/products" exact>
                    <List />
                </Route>
                <Route path="/admin/products/:productId"> {/*  Renderiza o formulario independente de criar ou editar um produto */}
                    <Form />
                </Route>
            </Switch>
        </div>
    );
}  

export default Products;