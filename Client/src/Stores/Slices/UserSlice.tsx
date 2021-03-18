import { IUserAccountModel, defaultUserAccountModel } from "../../Models/Authentication/IUserAccountModel"
import { callLogIn, callLogout } from "../../Remote/Endpoints/AuthenticationEndpoint"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { ILoginUserModel } from "../../Models/Authentication/ISignUpModel"
import { getUserDetails } from "../../Remote/Endpoints/UserEndpoint"
import moment from "moment"
import { useSelector } from "react-redux"

interface IUserSliceState { user: IUserAccountModel }
const initialState: IUserSliceState = { user: defaultUserAccountModel }
const sliceName = 'user'

export const useUserSelector = () => useSelector(state => (state as any).userStore.user)
export const loginAndLoadUserThunk = createAsyncThunk(`${sliceName}/login`, async (loginUser: ILoginUserModel) => {
  const loginResponse = await callLogIn(loginUser)

  if (loginResponse) {
    const userAccount: IUserAccountModel = await getUserDetails({ email: loginUser.email })
    userAccount.sessionExpiration = moment.duration(loginResponse.validFor).asMilliseconds()
    return userAccount
  }

  return defaultUserAccountModel
})

export const logoutThunk = createAsyncThunk(`${sliceName}/logout`, async () => {
  await callLogout()
  return defaultUserAccountModel
})

export const loadUserThunk = createAsyncThunk(`${sliceName}/loadUserDetails`, async (email: string) => {
  const user: IUserAccountModel = await getUserDetails({ email })
  return user || defaultUserAccountModel
})

const userSlice = createSlice({
  name: sliceName,
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginAndLoadUserThunk.fulfilled, (state, action) => {
        state.user = action.payload
      })
      .addCase(logoutThunk.fulfilled, (state, action) => {
        state.user = action.payload
      })
      .addCase(loadUserThunk.fulfilled, (state, action) => {
        state.user = action.payload
      })
  }
})

export const userReducer = userSlice.reducer