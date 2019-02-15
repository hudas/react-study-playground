import {ProductRow} from "../../components/list/ProductList";

export interface ProductListState {
  rows: ProductRow[];
  loading: boolean;
}

export const INITIAL_PRODUCT_LIST_STATE: ProductListState = {
  rows: [],
  loading: false
};