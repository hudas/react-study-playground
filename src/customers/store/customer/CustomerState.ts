import {ConsentSelection} from "../../components/form/consents-form/CustomerConsentsField";
import {Moment} from "moment";

export interface CustomerState {
  customer: Customer;
  updated: boolean;
}

export interface Customer {
  firstName: string;
  lastName: string;
  birthDate: Moment | null;
  address: string;
  email: string;
  phone: string;
  consents: ConsentSelection;
}

export const INITIAL_CUSTOMER_VALUE: CustomerState = {
  customer: {
    firstName: '',
    lastName: '',
    birthDate: null,
    address: '',
    email: '',
    phone: '',
    consents: {}
  },
  updated: false
};