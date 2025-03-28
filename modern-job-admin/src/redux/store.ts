import { legacy_createStore as createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { thunk, ThunkMiddleware } from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './auth/reducer';

// Define types
export interface RootState {
  auth: AuthState;
}



export type AppDispatch = typeof store.dispatch;

export type AppThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
  extra?: unknown;
} & { type: string };

// Persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

// Redux DevTools setup
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create store with typed thunk middleware
const store = createStore(
  persistedReducer,
  composeEnhancers(
    applyMiddleware(thunk as ThunkMiddleware<RootState, AppThunkConfig>)
  )
);

const persistor = persistStore(store);

export { store, persistor };
export type { RootState, AppDispatch };