import { HttpHeaders } from "@angular/common/http"
import { ILoginResponse, IUserData } from "./interface"

export const getUser = (): ILoginResponse => {
    const user: string | null  =  localStorage.getItem("user")
    return JSON.parse( user + '')
}   




