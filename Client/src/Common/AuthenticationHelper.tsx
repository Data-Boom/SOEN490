import { callLogout } from "../Remote/Endpoints/AuthenticationEndpoint"
import { removeUserInStorage } from "./Storage"

export const logout = async () => {
    removeUserInStorage()
    await callLogout()
}
