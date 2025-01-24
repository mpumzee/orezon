import { Roles } from "../enums/roles";

export interface User {
    id: number,
    name: string,
    email: string,
    password: string,
    role: Roles,
    password_confirmation: string
    package_id: number
}
