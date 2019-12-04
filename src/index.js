import 'bootstrap/dist/css/bootstrap.min.css';
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

/*const store = createStore(reducers, {}, applyMiddleware(reduxThunk));*/

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
serviceWorker.register();