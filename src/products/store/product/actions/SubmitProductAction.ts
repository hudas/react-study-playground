import {ActionStatus, RemoteAction} from "../../../../Store";
import {ProductActionTypes} from "./ProductActions";

export interface SubmitProduct extends RemoteAction {
  readonly type: ProductActionTypes.SUBMIT;
}

export function submitProduct() {
  return {
    type: ProductActionTypes.SUBMIT,
    status: ActionStatus.REQUEST
  }
}

export function submitProductFinished(status: ActionStatus) {
  return {
    type: ProductActionTypes.SUBMIT,
    status
  }
}

