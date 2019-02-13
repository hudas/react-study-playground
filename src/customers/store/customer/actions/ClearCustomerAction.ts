import {CustomerActionTypes} from "./CustomerActions";

export interface ClearCustomer {
  readonly type: CustomerActionTypes.CLEAR;
}

export function clearCustomer(): ClearCustomer {
  return {
    type: CustomerActionTypes.CLEAR
  }
}