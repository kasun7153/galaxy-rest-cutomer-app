import React from 'react';
import Navigator from './routes/navigation';
import {Provider} from 'react-redux';
import {combineReducers} from 'redux';
import cartReducer from './redux/cart/cartReducer';
import userManagementReducer from './redux/userManagment/userManagementReducer';
import {applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';
import {all, fork} from 'redux-saga/effects';
import {cartSagas} from './redux/cart/cartSaga';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import {NavigationContainer} from '@react-navigation/native';
import { navigationRef } from './RootNavigation';

function* rootSaga() {
  yield all(cartSagas.map((s) => fork(s)));
}

export default function App() {
  const combinedReducers = combineReducers({cartReducer, userManagementReducer});
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(combinedReducers, composeWithDevTools(applyMiddleware(sagaMiddleware)));

  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer ref={navigationRef}>
          <Navigator/>
        </NavigationContainer>
        <Toast ref={(ref) => Toast.setRef(ref)}/>
      </PersistGate>
    </Provider>
  );
}
