// store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import tagsReducer from './TagsSlice';
import productReducer from './AllReelsSlice'
import filterSlice from './FilterSlice';
import likeReelSlice from './LikeReelSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // transforms: [JSOGTransform]

};

const rootReducer = combineReducers({
  tags: tagsReducer,
  product: productReducer,
  filter: filterSlice,
  likeReel: likeReelSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;
