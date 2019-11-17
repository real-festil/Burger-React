import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import BurgerBulder from './containers/BurgerBuilder/BurgerBulder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/" component={BurgerBulder} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
