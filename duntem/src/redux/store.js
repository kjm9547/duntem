import {configureStore} from '@reduxjs/toolkit' 
import userReducer  from './reducer/userSlice'
import { thunk } from 'redux-thunk'
import dfCharacterSlice from './reducer/dfCharacterSlice'

export const store = configureStore({
    reducer:{
        user:userReducer,
        dfCharacter:dfCharacterSlice
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk), 
})