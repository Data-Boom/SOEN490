import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useContext, useState } from "react";
import { Redirect, useHistory } from 'react-router';
import { UserContext } from "../App";
import useInterval from 'react-useinterval';
import { loginRoute } from '../Common/Consts/Routes';
import { logout } from '../Common/GenericHelpers';
import { removeUserInStorage } from '../Common/Storage';
import { callLogout } from '../Remote/Endpoints/AuthenticationEndpoint';


export const SessionTimeOut = () => {

    const { user, setUser } = useContext(UserContext);
    const [seconds, setSeconds] = React.useState(10);
    //const [seconds, setSeconds] = React.useState(user.sessionExpiration);
    const [open, setOpen] = useState<boolean>(false)

    const history = useHistory()
    // const [redirect, setRedirect] = useState<boolean>(true)

    useInterval(() => {
        if (seconds === 1) {
            //endSession()
        }
        else if (seconds < 10) {
            setOpen(true)
        }
        setSeconds(seconds - 1)
    }, 1000)

    const redirectToLogin = () => {
        console.log(history.location, 'history locatioion')
        history.push({
            pathname: loginRoute
        })
        //removeUserInStorage()
        // callLogout();
    }

    const endSession = () => {
        logout()
    }

    return (
        <>
            <div onClick={redirectToLogin}>
                <Snackbar open={open} onClose={() => setOpen(false)}>
                    <Alert onClose={() => setOpen(false)} severity="warning">
                        Session ending soon.... {seconds} Time left. Click here to login again
                    </Alert>
                </Snackbar>
            </div>
        </>
    );
}
