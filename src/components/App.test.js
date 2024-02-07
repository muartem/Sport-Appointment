import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import App from 'src/components/App';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore();

describe('App', () => {
  it('should render properly', () => {
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
