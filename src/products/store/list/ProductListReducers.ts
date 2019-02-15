import {INITIAL_PRODUCT_LIST_STATE, ProductListState} from "./ProductListState";
import {ProductListActions, ProductListActionTypes} from "./ProductListActions";
import produce from "immer";
import {ActionStatus} from "../../../Store";
import {ProductRow} from "../../components/list/ProductList";


export function reduceProductList(state: ProductListState = INITIAL_PRODUCT_LIST_STATE, action: ProductListActions) {
  return produce(state, (draft: ProductListState) => {

    switch (action.type) {
      case ProductListActionTypes.LOAD:
        if (action.status === ActionStatus.SUCCESS) {
          draft.rows = action.products as ProductRow[];
        }
        break;
      default:
        // do nothing
    }
  });
}