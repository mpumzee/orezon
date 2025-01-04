import { Country } from "../enums/country";

export interface Buyer {
    id: number,
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
    national_id: string,
    country: Country,
    contact_number: string,
    address: string,
    profile_pic: any,
    created_by: Date
}
