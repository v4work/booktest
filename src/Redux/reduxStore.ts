import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import commonReducer from './commonReducer';
//@ts-ignore
import thunkMiddleWare from 'redux-thunk';

export interface RootState {
  common: ReturnType<typeof commonReducer>;
}

const rootReducer = combineReducers({
  common: commonReducer,
});

const store: Store<RootState> = createStore(rootReducer, applyMiddleware(thunkMiddleWare));

if (process.env.NODE_ENV === 'development') {
  (window as any).store = store;
}

export default store;