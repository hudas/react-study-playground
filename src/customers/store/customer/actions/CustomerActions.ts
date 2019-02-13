import {LoadCustomer} from "./LoadCustomerAction";
import {SubmitCustomer} from "./SubmitCustomerActions";
import {PrepareCustomerForm} from "./PrepareCustomerFormAction";
import {ClearCustomer} from "./ClearCustomerAction";

export type CustomerActions = PrepareCustomerForm |
  ClearCustomer |
  LoadCustomer |
  SubmitCustomer;

export enum CustomerActionTypes {
  PREPARE_FORM = '[Customer] PREPARE_FORM',
  CLEAR = '[Customer] CLEAR',
  LOAD = '[Customer] LOAD',
  SUBMIT = '[Customer] SUBMIT'
}
