import {RESET_USER_DETAILS, SET_USER_DETAILS} from './userManagementActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';

const initialState = {
  customerName: 'kasun',
  idNumber: '973221337v',
  tableNumber: 5,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_DETAILS:
      return {
        ...state,
        customerName: action.details.customerName,
        idNumber: action.details.idNumber,
        tableNumber: action.details.tableNumber
      };
    case RESET_USER_DETAILS:
      return {
        ...state,
        customerName: null,
        idNumber: null,
        tableNumber: null
      };
    default:
      return state;
  }
}

const persistConfig = {
  keyPrefix: 'galaxy-rest-',
  key: 'user-details',
  blacklist: ['loading'],
  storage:AsyncStorage,
};

export default persistReducer(persistConfig, reducer);
