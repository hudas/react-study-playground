import {ActionStatus, RemoteAction} from "../../../Store";
import {ProductRow} from "../../components/list/ProductList";

export type ProductListActions = LoadProductList;

export enum ProductListActionTypes {
  LOAD = '[Products.list] LOAD',
}

export interface LoadProductList extends RemoteAction {
  readonly type: ProductListActionTypes.LOAD;
  products?: ProductRow[];
}

export function loadProductList(): LoadProductList {
  return {
    type: ProductListActionTypes.LOAD,
    status: ActionStatus.REQUEST
  };
}

export function loadProductListSucceded(products: ProductRow[]): LoadProductList {
  return {
    type: ProductListActionTypes.LOAD,
    status: ActionStatus.SUCCESS,
    products
  };
}

export function loadProductListFailed(): LoadProductList {
  return {
    type: ProductListActionTypes.LOAD,
    status: ActionStatus.FAILURE
  };
}