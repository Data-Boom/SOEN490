import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistReducer, persistStore } from 'redux-persist'

import { dimensionsReducer } from "./Slices/DimensionsSlice"
import storageSession from 'redux-persist/lib/storage/session'
import { userReducer } from "./Slices/UserSlice"
import { variablesReducer } from "./Slices/VariablesSlice"

const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: ['userStore']
}

const rootReducer = combineReducers({
  dimensionsStore: dimensionsReducer,
  userStore: userReducer,
  variablesStore: variablesReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const rootStore = configureStore({
  reducer: persistedReducer
})
export const persistor = persistStore(rootStore)