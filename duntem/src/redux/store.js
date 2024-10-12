import {combineReducers, configureStore} from '@reduxjs/toolkit' 
import userReducer  from './reducer/userSlice'
import storage from 'redux-persist/lib/storage'
import { thunk } from 'redux-thunk'
import dfCharacterSlice from './reducer/dfCharacterSlice'
import { persistStore, persistReducer } from 'redux-persist';
import dfCharacterListSlice from './reducer/dfCharacterListSlice'


const rootReducer = combineReducers({
  user: userReducer,
  dfCharacter: dfCharacterSlice,
  dfCharcterList:dfCharacterListSlice
});
const persistConfig = {
  key: 'root', // 저장 키
  storage,     // 로컬 스토리지 사용
  whitelist: ['user','dfCharacter','dfCharcterList'], // user 상태만 저장 (선택적)
};
const persistedReducer =  persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk),
});

export const persistor = persistStore(store);
