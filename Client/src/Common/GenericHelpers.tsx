import { removeUserInStorage } from "./Storage";
import { callLogout } from "../Remote/Endpoints/AuthenticationEndpoint";

export const logout = () => {
    removeUserInStorage()
    window.location.replace("/")
    callLogout();
}
