import {ActionStatus, RemoteAction} from "../../../../Store";
import {Customer} from "../CustomerState";
import {CustomerActionTypes} from "./CustomerActions";

export interface LoadCustomer extends RemoteAction {
  readonly type: CustomerActionTypes.LOAD;
  id: string;
  customer?: Customer;
}

export function loadCustomer(id: string): LoadCustomer {
  return {
    type: CustomerActionTypes.LOAD,
    status: ActionStatus.REQUEST,
    id
  }
}

export function loadCustomerSucceeded(id: string, customer: Customer): LoadCustomer {
  return {
    type: CustomerActionTypes.LOAD,
    status: ActionStatus.SUCCESS,
    id,
    customer
  }
}

export function loadCustomerFailed(id: string): LoadCustomer {
  return {
    type: CustomerActionTypes.LOAD,
    status: ActionStatus.FAILURE,
    id
  }
}
