import {CustomerListState, INITIAL_CUSTOMER_LIST_STATE} from "./CustomerListState";
import {CustomerListActions, CustomerListActionTypes} from "./CustomerListActions";
import produce from "immer";
import {ActionStatus} from "../../../Store";

export function reduceCustomerList(state: CustomerListState = INITIAL_CUSTOMER_LIST_STATE, action: CustomerListActions) {
  return produce(state, (draft: CustomerListState) => {
    switch (action.type) {
      case CustomerListActionTypes.LOAD:
        if (action.status === ActionStatus.REQUEST) {
          draft.loading = true;
        } else if (action.status === ActionStatus.SUCCESS) {
          draft.rows = action.customers;
          draft.loading = false;
        } else {
          draft.loading = false;
        }
        break;
    }

  });
}