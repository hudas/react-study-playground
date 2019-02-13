import {CustomerRow} from "../../components/list/CustomerList";

export interface CustomerListState {
  rows: CustomerRow[];
  loading: boolean;
}

export const INITIAL_CUSTOMER_LIST_STATE: CustomerListState = {
  rows: [],
  loading: false
};