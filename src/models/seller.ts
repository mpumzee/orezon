import { Country } from "../enums/country";
import { BankDetails } from "./bank-details";

export interface Seller {
    id: number,
    user_id: number,
    id_number: number,
    country: Country,
    business_name: string,
    phone: string,
    created_at: Date,
    updated_at: Date,
    name: string,
    email: string,
    role: string,
    password: string,
    password_confirmation: string,
    bank_details: BankDetails
}
