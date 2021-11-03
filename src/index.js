import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"
import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore from './Store';
import { userActions } from './_actions';

const renderApp = preloadedState => {
    const store = configureStore(preloadedState);
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
      document.getElementById("root")
    );
}

(async () => renderApp(await userActions.sessionCheck()))();


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();