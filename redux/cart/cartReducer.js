import * as actionTypes from './cartActions';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from "lodash";

const initialState = {
  items: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.RESET_CART:
      return {...state, items: []};
    case actionTypes.ADD_ITEM:
      const itemIndex = _.findIndex(state.items, {_id:action.item._id})
      if(itemIndex<0){
        return {...state, items: [...state.items, action.item]};
      } else {
        state.items[itemIndex].qty =state.items[itemIndex].qty+action.item.qty
        return {...state};
      }
    case actionTypes.REMOVE_CART_ITEM:
      return {...state, items: state.items.filter(el=>!(el._id===action.item._id))};
    default:
      return state;
  }
}

const persistConfig = {
  keyPrefix: 'galaxy-rest-',
  key: 'cart-list',
  blacklist: ['loading'],
  storage:AsyncStorage,
};

export default persistReducer(persistConfig, reducer);
