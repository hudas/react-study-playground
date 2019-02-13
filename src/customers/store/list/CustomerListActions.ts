import {ActionStatus, RemoteAction} from "../../../Store";
import {CustomerRow} from "../../components/list/CustomerList";

export type CustomerListActions = LoadCustomerList;

export enum CustomerListActionTypes {
  LOAD = '[Customer.list] LOAD'
}

export interface LoadCustomerList extends RemoteAction {
  readonly type: CustomerListActionTypes.LOAD;
  customers?: CustomerRow[];
}

export function loadCustomerList() {
  return {
    type: CustomerListActionTypes.LOAD,
    status: ActionStatus.REQUEST
  }
}

export function loadCustomerListSucceded(customers: CustomerRow[]) {
  return {
    type: CustomerListActionTypes.LOAD,
    status: ActionStatus.SUCCESS,
    customers
  }
}

export function loadCustomerListFailed() {
  return {
    type: CustomerListActionTypes.LOAD,
    status: ActionStatus.FAILURE
  }
}