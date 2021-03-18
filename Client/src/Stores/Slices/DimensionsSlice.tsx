import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit"

import { IDimensionModel } from "../../Models/Dimensions/IDimensionModel"
import { callGetAllDimensions } from "../../Remote/Endpoints/DimensionsEndpoint"
import { useSelector } from "react-redux"

const sliceName = 'dimensions'

const dimensionsAdapter = createEntityAdapter()
interface IDimensionsSliceState { dimensions: IDimensionModel[], status: string }
const initialState = dimensionsAdapter.getInitialState({ dimensions: [], status: '' }) as IDimensionsSliceState

export const useDimensionsSelector = () => useSelector(state => (state as any).dimensionsStore.dimensions)
export const loadDimensionsThunkAction = createAsyncThunk(`${sliceName}/loadDimensions`, callGetAllDimensions)

const dimensionsSlice = createSlice({
  name: sliceName,
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadDimensionsThunkAction.fulfilled, (state, action) => {
      state.dimensions = action.payload
    })
  }
})

export const dimensionsReducer = dimensionsSlice.reducer