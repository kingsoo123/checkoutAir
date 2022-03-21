import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from "redux-thunk";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import rootReducer from "./reducers";
import config from "./config";


const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['initialize_pay']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


let middleware = window.navigator.userAgent.includes("Chrome")
  ? compose(
    applyMiddleware(thunk, reduxImmutableStateInvariant()),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
  )
  : compose(applyMiddleware(thunk, reduxImmutableStateInvariant()));

if (config().env === "production") {
  middleware = applyMiddleware(thunk);
}





  const store = createStore(persistedReducer, middleware);
  let persistor = persistStore(store)



export { store, persistor }