import {ActionStatus} from "../../../Store";
import {ProductActions, ProductActionTypes} from "./actions/ProductActions";
import produce from "immer";
import {INITIAL_PRODUCT_STATE, ProductState} from "./ProductState";
import {ProductFormState} from "../../pages/update/ProductUpdatePage";

export function reduceProductState(state: ProductState = INITIAL_PRODUCT_STATE, action: ProductActions) {
  return produce(state, (draft: ProductState) => {
    switch (action.type) {
      case ProductActionTypes.LOAD:
        if (action.status === ActionStatus.SUCCESS) {
          draft.product = action.product as ProductFormState;
        }
        break;
    }
  })
}