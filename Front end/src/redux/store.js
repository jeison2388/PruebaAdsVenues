import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import usuarioReducer from './reducers/usuario/usuarioReducer'

const composeEnhancers =
typeof window === 'object' &&
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
  }) : compose;

  const reducer = combineReducers({
      usuarioReducer
  })

  const store = createStore(reducer,composeEnhancers())

  export default store
