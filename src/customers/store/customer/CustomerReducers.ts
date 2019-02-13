import {CustomerState, INITIAL_CUSTOMER_VALUE} from "./CustomerState";
import {CustomerActions, CustomerActionTypes} from "./actions/CustomerActions";
import produce from "immer";
import {ActionStatus} from "../../../Store";


export function reduceCustomer(state: CustomerState = INITIAL_CUSTOMER_VALUE, action: CustomerActions) {
  return produce(state, (draft: CustomerState) => {
    switch (action.type) {
      case CustomerActionTypes.CLEAR:
        draft.customer = INITIAL_CUSTOMER_VALUE.customer;
        draft.updated = INITIAL_CUSTOMER_VALUE.updated;
        break;
      case CustomerActionTypes.LOAD:
        if (action.status === ActionStatus.SUCCESS) {
          draft.customer = action.customer;
        }
        break;
      case CustomerActionTypes.SUBMIT:
        if (action.status === ActionStatus.SUCCESS) {
          draft.updated = true;
        }
        break;
    }
  });
}