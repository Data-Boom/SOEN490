import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit"

import { IVariableNameModel } from "../../Models/Variables/IVariableNameModel"
import { getVariableNames } from "../../Remote/Endpoints/VariableEndpoint"
import { useSelector } from "react-redux"

const sliceName = 'variables'

const variablesAdapter = createEntityAdapter()
interface IVariablesSliceState { variables: IVariableNameModel[], status: string }
const initialState = variablesAdapter.getInitialState({ variables: [], status: '' }) as IVariablesSliceState

export const useVariablesSelector = () => useSelector(state => (state as any).variablesStore.variables)
export const loadVariablesThunk = createAsyncThunk(`${sliceName}/loadVariables`, getVariableNames)

const variablesSlice = createSlice({
  name: sliceName,
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadVariablesThunk.fulfilled, (state, action) => {
      state.variables = action.payload
    })
  }
})

export const variablesReducer = variablesSlice.reducer