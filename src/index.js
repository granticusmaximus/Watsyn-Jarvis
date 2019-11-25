import 'bootstrap/dist/css/bootstrap.min.css';
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import React from 'react';
import ReactDOM from 'react-dom';
//import {Provider} from 'react-redux';
//import {createStore, applyMiddleware} from 'redux';
//import reduxThunk from 'redux-thunk';
//import reducers from './reducers';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import Firebase, { FirebaseContext } from './components/Firebase';

/*const store = createStore(reducers, {}, applyMiddleware(reduxThunk));*/

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById("root")
);
serviceWorker.register();