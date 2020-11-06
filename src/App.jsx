import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Productos from "components/Productos";
import NuevoProducto from "components/NuevoProducto";
import EditarProducto from "components/EditarProducto";

import Header from 'components/Header';

//Redux
import {Provider} from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <div className="container mt-5">
          <Switch>
            <Route exact path="/" component={Productos} />
            <Route exact path="/productos/nuevo" component={NuevoProducto} />
            <Route
              exact
              path="/productos/editar/:id"
              component={EditarProducto}
            />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
