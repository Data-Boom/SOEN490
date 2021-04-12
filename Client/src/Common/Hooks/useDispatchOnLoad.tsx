import { AsyncThunk } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { useEffect } from "react"

export const useDispatchOnLoad = (thunk: AsyncThunk<unknown, void, {}>) => {
  const dispatch = useDispatch()
  useEffect(() => { dispatch(thunk()) }, [])
}