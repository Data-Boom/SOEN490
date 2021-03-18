import { IUserAccountModel, defaultUserAccountModel } from "../../Models/Authentication/IUserAccountModel"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { ILoginUserModel } from "../../Models/Authentication/ISignUpModel"
import { callLogIn } from "../../Remote/Endpoints/AuthenticationEndpoint"
import { getUserDetails } from "../../Remote/Endpoints/UserEndpoint"
import moment from "moment"

interface IUserSliceState { user: IUserAccountModel }
const initialState: IUserSliceState = { user: defaultUserAccountModel }
const sliceName = 'user'

export const loginAndLoadUserThunkAction = createAsyncThunk(`${sliceName}/login`, async (loginUser: ILoginUserModel) => {
  const loginResponse = await callLogIn(loginUser)

  if (loginResponse) {
    const userAccount: IUserAccountModel = await getUserDetails({ email: loginUser.email })
    userAccount.sessionExpiration = moment.duration(loginResponse.validFor).asMilliseconds()
    return userAccount
  }

  return defaultUserAccountModel
})

const userSlice = createSlice({
  name: sliceName,
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginAndLoadUserThunkAction.fulfilled, (state, action) => {
        state.user = action.payload
      })
  }
})

export const userReducer = userSlice.reducer