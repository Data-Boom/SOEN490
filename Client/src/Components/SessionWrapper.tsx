import { Button, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";


export const SessionWrapper = (WrappedComponent: React.ComponentType<any & any>) => {

    const { user, setUser } = useContext(UserContext);

    const [seconds, setSeconds] = React.useState();
    const [open, setOpen] = useState<boolean>()

    let openWarning: boolean = false;

    useEffect(() => {
        let timer = setTimeout(() => {
            console.log('hit timer')
            openWarningBar()
        }, 10000)

        return (() => clearTimeout(timer))
    }, [])



    const openWarningBar = () => {
        console.log(openWarning)
        openWarning = true
        console.log(openWarning)
        //let warning = document.getElementById('openWarning')
        // console.log(openWarning)
        // warning.open = true
        // setOpen(true)
    }


    return function () {
        return (
            <>
                <h1>Number of seconds is {seconds}</h1>
                <WrappedComponent />
                {
                    <Snackbar open={openWarning} autoHideDuration={3000} onClose={() => setOpen(false)}>
                        <Alert onClose={() => setOpen(false)} severity="warning">
                            Session ending soon.... Click here to login again
                        </Alert>
                    </Snackbar>
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