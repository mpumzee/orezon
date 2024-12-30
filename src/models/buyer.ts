import { Country } from "../enums/country";

export interface Buyer {
    id: number,
    full_name: string,
    national_id: string,
    country: Country,
    email: string,
    contact_number: string,
    address: string,
    propic: string,
    created_by: number
}
