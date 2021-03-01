import React, { useContext, useState } from "react";

import { Alert } from '@material-ui/lab';
import { Snackbar } from '@material-ui/core';
import { UserContext } from "../App";
import { defaultUserAccountModel } from '../Models/Authentication/IUserAccountModel';
import useInterval from 'react-useinterval';

export const SessionTimeOut = () => {

    const { user, setUser } = useContext(UserContext);
    const [seconds, setSeconds] = React.useState(user.sessionExpiration);
    const [open, setOpen] = useState<boolean>(false)

    useInterval(() => {
        if (seconds === 1) {
            redirectToLogin()
        }
        else if (seconds < 10) {
            setOpen(true)
        }
        setSeconds(seconds - 1)
    }, 1000)

    const redirectToLogin = async () => {
        setUser(defaultUserAccountModel)
        redirectToLogin()
    }

    return (
        <div onClick={redirectToLogin}>
            <Snackbar open={open} onClose={() => setOpen(false)}>
                <Alert onClose={() => setOpen(false)} severity="warning">
                    Session ending soon.... {seconds} Time left. Click here to login again :)
                    </Alert>
            </Snackbar>
        </div>
    );
}
