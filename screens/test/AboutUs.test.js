import React from "react"
import About from '../../screens/about'
import { render, fireEvent, act } from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

const flushMicrotasksQueue = () =>
  new Promise((resolve) => setImmediate(resolve));

describe('<Home />', () => {
  const mockStore = configureStore([]);
  it("renders default elements", () => {
    const store = mockStore();
    const { getAllByText, getByPlaceholderText} = render(<Provider store={store}><About navigation={
      {
        setOptions: jest.fn()
      }
    }/></Provider>);
    expect(getAllByText("info@galaxyresta.com").length).toBe(1);
    expect(getAllByText("+94763250332").length).toBe(1);
    expect(getAllByText("www.galaxy-rest.com").length).toBe(1);
  });
})

