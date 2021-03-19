import { Button, Snackbar } from '@material-ui/core'
import React, { useState } from "react"
import { logoutThunk, useUserSelector } from '../Stores/Slices/UserSlice'

import { Alert } from '@material-ui/lab'
import { loginRoute } from "../Common/Consts/Routes"
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router"
import useInterval from 'react-useinterval'

export const SessionTimeOut = () => {
  const dispatch = useDispatch()
  const user = useUserSelector()

  const [seconds, setSeconds] = React.useState(user.sessionExpiration)
  const [open, setOpen] = useState<boolean>(false)
  const history = useHistory()

  useInterval(() => {
    if (seconds === 1) {
      redirectToLogin()
    }
    else if (seconds < (60 * 5)) {
      setOpen(true)
    }
    setSeconds(seconds - 1)
  }, 1000)

  const redirectToLogin = async () => {
    dispatch(logoutThunk())
    history.push({
      pathname: loginRoute
    })
  }

  const logoutButton = <Button variant='contained' size="small" color="primary" onClick={redirectToLogin}>Log in</Button>

  return (
    <Snackbar open={open} onClose={() => setOpen(false)}>
      <Alert onClose={() => setOpen(false)} variant="outlined" severity="info" action={logoutButton}>
        Session ends in {seconds} seconds.
      </Alert>
    </Snackbar>
  )
}