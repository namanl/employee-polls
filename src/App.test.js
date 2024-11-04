import { render } from '@testing-library/react';
import * as React from 'react';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore } from 'redux';
import reducer from './reducers';
import { applyMiddleware } from 'redux';
import { MemoryRouter } from 'react-router';

const store = createStore(reducer, applyMiddleware(thunk));

describe('App', () => {
  it('matches the snapshot', () => {
    const component = render(
      <MemoryRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    expect(component).toMatchSnapshot();
  });
});
