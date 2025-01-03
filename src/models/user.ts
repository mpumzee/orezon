import { Roles } from "../enums/roles";

export interface User {
    name: string,
    email: string,
    password: string,
    role: Roles,
    password_confirmation: string
}
