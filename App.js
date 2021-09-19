import React from 'react';
import Naigator from './routes/drawer';
import { Provider } from 'react-redux';
import {combineReducers} from 'redux';
import cartReducer from './redux/cart/cartReducer';
import {applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { all, fork } from "redux-saga/effects";
import {cartSagas} from './redux/cart/cartSaga';

function* rootSaga() {
    yield all(cartSagas.map((s) => fork(s)));
}

export default function App() {
  const combinedReducers = combineReducers({cartReducer})
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(combinedReducers, composeWithDevTools(applyMiddleware(sagaMiddleware)));
    sagaMiddleware.run(rootSaga);
  return (
      <Provider store={store}>
        <Naigator/>
      </Provider>
  );
}
