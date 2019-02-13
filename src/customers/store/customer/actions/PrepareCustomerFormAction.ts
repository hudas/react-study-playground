import {Action} from "redux";
import {CustomerActionTypes} from "./CustomerActions";

export interface PrepareCustomerForm extends Action {
  readonly type: CustomerActionTypes.PREPARE_FORM,
  existingId?: string
}

export function prepareCustomerForm(existingId?: string) {
  return {
    type: CustomerActionTypes.PREPARE_FORM,
    existingId
  }
}