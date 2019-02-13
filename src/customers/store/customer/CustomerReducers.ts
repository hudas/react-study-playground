import {CustomerState, INITIAL_CUSTOMER_VALUE} from "./CustomerState";
import {CustomerActions, CustomerActionTypes} from "./CustomerActions";
import produce from "immer";
import {ActionStatus} from "../../../Store";


export function reduceCustomer(state: CustomerState = INITIAL_CUSTOMER_VALUE, action: CustomerActions) {
  return produce(state, (draft: CustomerState) => {
    switch (action.type) {
      case CustomerActionTypes.LOAD:
        if (action.status === ActionStatus.SUCCESS) {
          draft.customer = action.customer;
        }
        break;
    }
  });
}