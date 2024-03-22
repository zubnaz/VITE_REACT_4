import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import {store} from "./store";
import {autoLogin} from "./store/accounts/accounts.slice.ts";
import {isTokenActive} from "./utils/storage/isTokenActive.ts";
import {getLocalStorage} from "./utils/storage/localStorageUtils.ts";

const token = getLocalStorage('authToken');
if (typeof token === 'string') {
    if (isTokenActive(token)) {
        store.dispatch(autoLogin(token));
    }
}
ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </>,
)
