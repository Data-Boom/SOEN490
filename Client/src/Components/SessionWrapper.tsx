import { Button, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect, useHistory } from 'react-router-dom'
import { UserContext } from "../App";
import { loginRoute } from '../Common/Consts/Routes';


export const SessionWrapper = (WrappedComponent: React.ComponentType<any & any>) => {

    const { user, setUser } = useContext(UserContext);

    const history = useHistory()

    const [seconds, setSeconds] = React.useState();
    const [open, setOpen] = useState<boolean>()

    let openWarning: boolean = false;

    useEffect(() => {
        let timer = setTimeout(() => {
            console.log('hit timer')
            openWarningBar()
        }, 3000)

        return (() => clearTimeout(timer))
    }, [])



    const openWarningBar = () => {
        console.log(openWarning)
        openWarning = true
        console.log(openWarning)
        //let warning = document.getElementById('openWarning')
        // console.log(openWarning)
        // warning.open = true
        setOpen(true)
    }

    const redirectToLogin = () => {
        console.log('redirec ti shit')
        // history.push(loginRoute)
        //window.location.replace('/log-in')
        return <Link to={loginRoute} />
    }


    return function () {
        return (
            <>
                <h1>Number of seconds is {seconds}</h1>
                <WrappedComponent />
                {
                    <div onClick={redirectToLogin}>
                        <Snackbar open={open} autoHideDuration={5000} onClose={() => setOpen(false)}>
                            <Alert onClose={() => setOpen(false)} severity="warning">
                                Session ending soon.... Click here to login again
                        </Alert>
                        </Snackbar>
                    </div>
                }
            </>
        );
    }

}


    // const renderSessionTimeout = () => {
    //     return (
    //         <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
    //             <Alert onClose={() => setOpen(false)} severity="warning">
    //                 Session ending soon.... Click here to login again
    //             </Alert>
    //         </Snackbar>
    //     )
    // }