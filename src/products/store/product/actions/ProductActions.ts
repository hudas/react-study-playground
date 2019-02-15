import {SubmitProduct} from "./SubmitProductAction";
import {LoadProduct} from "./LoadProductAction";

export type ProductActions = LoadProduct | SubmitProduct;

export enum ProductActionTypes {
  LOAD = '[Product] LOAD',
  SUBMIT = '[Product] SUBMIT'
}

