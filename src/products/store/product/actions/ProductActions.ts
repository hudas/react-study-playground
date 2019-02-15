import {SubmitProduct} from "./SubmitProductAction";

export type ProductActions = SubmitProduct;

export enum ProductActionTypes {
  LOAD = '[Product] LOAD',
  SUBMIT = '[Product] SUBMIT'
}

