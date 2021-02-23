import { Button } from "@material-ui/core";
import React, { useContext } from "react";
import { UserContext } from "../App";


export const SessionTimeOut = () => {
    const { user, setUser } = useContext(UserContext);

    return (
        <div>
            <p> eergerge</p>
            {user.sessionExpiration ?
                < Button > The answer is {user.sessionExpiration}.</Button> :
                < div > Login here.</div>
            }
        </div >
    )
}