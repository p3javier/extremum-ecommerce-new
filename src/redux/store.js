import reducer from './reducer';

//import createStore that will create a store from redux.
import { createStore } from 'redux';

//Export the reducer with redux dev tools.

export default createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());