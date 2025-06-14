import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import accountReducer from './slices/accountSlice';
import transactionReducer from './slices/transactionSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'] // only auth will be persisted
};

const rootReducer = combineReducers({
  auth: authReducer,
  accounts: accountReducer,
  transactions: transactionReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Import middleware when package issues are resolved
// import { errorMiddleware } from './middleware/errorMiddleware';

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    })
    // Add middleware when package issues are resolved
    // .concat(errorMiddleware)
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;