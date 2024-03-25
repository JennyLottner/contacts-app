import { contactReducer } from './reducers/contact.reducer.js'
import { appReducer } from './reducers/app.reducer.js'

const { createStore, combineReducers, compose } = Redux

const rootReducer = combineReducers({
    contactModule: contactReducer,
    appModule: appReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers())
