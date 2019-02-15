import {LoadCustomer} from "./LoadCustomerAction";
import {SubmitCustomer} from "./SubmitCustomerActions";
import {ClearCustomer} from "./ClearCustomerAction";

export type CustomerActions = ClearCustomer |
  LoadCustomer |
  SubmitCustomer;

export enum CustomerActionTypes {
  CLEAR = '[Customer] CLEAR',
  LOAD = '[Customer] LOAD',
  SUBMIT = '[Customer] SUBMIT'
}
