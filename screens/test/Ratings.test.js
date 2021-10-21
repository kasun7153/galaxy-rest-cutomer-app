import React from "react"
import Rating from '../../screens/raings'
import { render, fireEvent, act,waitFor  } from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

const flushMicrotasksQueue = () =>
  new Promise((resolve) => setImmediate(resolve));

describe('<Categories />',  () => {
  const mockStore = configureStore([]);
  const push = jest.fn();
  it("renders default elements", async () => {

    const store = mockStore({userManagementReducer:{customerName:"kasun"}});
    const {getByTitle,getByPlaceholderText}=render(<Provider store={store}><Rating
      navigation={
        {
          setOptions: push
        }
      }/></Provider>);
    expect(fetch.mock.calls).toMatchSnapshot();
    expect(getByPlaceholderText("Write your review"))
  });
})

