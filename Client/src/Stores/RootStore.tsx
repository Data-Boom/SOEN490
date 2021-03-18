import { configureStore } from "@reduxjs/toolkit"
import { dimensionsReducer } from "./Slices/DimensionsSlice"
import { userReducer } from "./Slices/UserSlice"

export const rootStore = configureStore({
  reducer: {
    dimensionsStore: dimensionsReducer,
    userStore: userReducer
  }
})