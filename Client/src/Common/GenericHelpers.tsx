import { callLogout } from "../Remote/Endpoints/AuthenticationEndpoint";
import { removeUserInStorage } from "./Storage";

export const logout = () => {
    removeUserInStorage()
    window.location.replace("/")
    callLogout();
}

export const redirectToLogin = async () => {
    removeUserInStorage()
    await callLogout();
}