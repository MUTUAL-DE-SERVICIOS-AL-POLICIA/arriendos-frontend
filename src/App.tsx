import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';
import { store } from './store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <>
          <ToastContainer />
          <AppRouter />
        </>
      </Provider>
    </BrowserRouter>
  )
}