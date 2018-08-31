import { createStore, applyMiddleware, compose } from 'redux';
//import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const initialState = {};

const middleware = [];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    //for Google Chrome Redux extension
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
