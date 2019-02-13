import {ActionStatus, RemoteAction} from "../../../../Store";
import {Customer} from "../CustomerState";
import {CustomerActionTypes} from "./CustomerActions";


export interface SubmitCustomer extends RemoteAction {
  readonly type: CustomerActionTypes.SUBMIT;
  id: string;
  customer?: Customer;
}


export function submitCustomer(id: string, customer: Customer): SubmitCustomer {
  return {
    type: CustomerActionTypes.SUBMIT,
    status: ActionStatus.REQUEST,
    id,
    customer
  }
}

export function submitCustomerSucceeded(id: string): SubmitCustomer {
  return {
    type: CustomerActionTypes.SUBMIT,
    status: ActionStatus.SUCCESS,
    id
  }
}

export function submitCustomerFailed(id: string): SubmitCustomer {
  return {
    type: CustomerActionTypes.SUBMIT,
    status: ActionStatus.FAILURE,
    id
  }
}