import {ActionStatus, RemoteAction} from "../../../../Store";
import {ProductFormState} from "../../../pages/update/ProductUpdatePage";
import {ProductActionTypes} from "./ProductActions";
import {ActionTypes} from "redux-form";

export interface LoadProduct extends RemoteAction {
  readonly type: ProductActionTypes.LOAD;
  id?: string;
  product?: ProductFormState;
}

export function loadProduct(id: string): LoadProduct {
  return {
    type: ProductActionTypes.LOAD,
    status: ActionStatus.REQUEST,
    id
  }
}

export function loadProductSucceeded(product: ProductFormState): LoadProduct {
  return {
    type: ProductActionTypes.LOAD,
    status: ActionStatus.SUCCESS,
    product
  }
}

export function loadProductFailed(): LoadProduct {
  return {
    type: ProductActionTypes.LOAD,
    status: ActionStatus.FAILURE
  }
}