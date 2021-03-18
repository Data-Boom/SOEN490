import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { IDimensionModel } from "../Models/Dimensions/IDimensionModel"
import { callGetAllDimensions } from "../Remote/Endpoints/DimensionsEndpoint"

interface IDimensionsSliceState { dimensions: IDimensionModel[], state: string }
const initialState: IDimensionsSliceState = { dimensions: [], state: '' }

export const loadDimensionsThunkAction = createAsyncThunk('dimensions/loadDimensions', callGetAllDimensions)

const dimensionsSlice = createSlice({
  name: 'dimensions',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadDimensionsThunkAction.fulfilled, (state, action) => {
      state.dimensions = action.payload
    })
  }
})

export const dimensionsReducer = dimensionsSlice.reducer