import { Country } from '../enums/country';

export interface Buyer {
  id: number;
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  id_number: string;
  country: Country;
  phone: string;
  address: string;
  profile_pic: File;
  created_at: Date;
  updated_at: Date;
}
