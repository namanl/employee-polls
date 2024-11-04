import Login from './Login';
import { render, fireEvent } from '@testing-library/react';
import * as React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import reducer from '../reducers';
import thunk from 'redux-thunk';
import { createStore } from 'redux';
import { applyMiddleware } from 'redux';

const store = createStore(reducer, applyMiddleware(thunk));

describe('login', () => {
  it('matches the snapshot', () => {
    const component = render(
      <MemoryRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </MemoryRouter>
    );
    expect(component).toMatchSnapshot();
  });

  it('verify of Enter name & password and login', () => {
    const component = render(
      <MemoryRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </MemoryRouter>
    );
    expect(component.getByTestId('username')).toBeInTheDocument();
    expect(component.getByTestId('password')).toBeInTheDocument();
    expect(component.getByTestId('submit')).toBeInTheDocument();
  });

  it('verify of no error with valid name and password', () => {
    const component = render(
      <MemoryRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </MemoryRouter>
    );

    const nameInput = component.getByTestId('username');
    fireEvent.change(nameInput, { target: { value: 'tylermcginnis' } });
    expect(nameInput).toBeInTheDocument();

    const passwordInput = component.getByTestId('password');
    fireEvent.change(passwordInput, { target: { value: 'abc321' } });
    expect(passwordInput).toBeInTheDocument();

    const submitButton = component.getByTestId('submit');
    fireEvent.click(submitButton);
    expect(submitButton).toBeInTheDocument();
  });
});
