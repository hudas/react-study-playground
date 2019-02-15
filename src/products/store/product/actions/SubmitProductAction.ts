import {ActionStatus, RemoteAction} from "../../../../Store";
import {ProductFormState} from "../../../pages/update/ProductUpdatePage";
import {ProductActionTypes} from "./ProductActions";

export interface SubmitProduct extends RemoteAction {
  product?: ProductFormState;
}

export function submitProduct(product: ProductFormState) {
  return {
    type: ProductActionTypes.SUBMIT,
    status: ActionStatus.REQUEST,
    product
  }
}

export function submitProductFinished(status: ActionStatus) {
  return {
    type: ProductActionTypes.SUBMIT,
    status
  }
}

