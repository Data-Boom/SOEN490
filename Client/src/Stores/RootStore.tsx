import { configureStore } from "@reduxjs/toolkit"
import { dimensionsReducer } from "./DimensionsSlice"

export const rootStore = configureStore({
  reducer: {
    dimensions: dimensionsReducer
  }
})