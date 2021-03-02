import { Button, Snackbar } from '@material-ui/core'
import React, { useContext, useState } from "react"

import { Alert } from '@material-ui/lab'
import { UserContext } from "../App"
import { callLogout } from "../Remote/Endpoints/AuthenticationEndpoint"
import { defaultUserAccountModel } from '../Models/Authentication/IUserAccountModel'
import { loginRoute } from "../Common/Consts/Routes"
import { useHistory } from "react-router"
import useInterval from 'react-useinterval'

export const SessionTimeOut = () => {

  const { user, setUserContext } = useContext(UserContext)
  const [seconds, setSeconds] = React.useState(user.sessionExpiration)
  const [open, setOpen] = useState<boolean>(true)
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
    setUserContext(defaultUserAccountModel)
    await callLogout()
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