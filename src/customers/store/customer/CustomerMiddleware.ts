import {Dispatch, MiddlewareAPI} from "redux";
import {CustomerActions, CustomerActionTypes, loadCustomerFailed, loadCustomerSucceded} from "./CustomerActions";
import {ActionStatus} from "../../../Store";
import {getCustomer} from "../../services/CustomerService";
import {CustomerDTO} from "../../services/dto/CustomerUpdateDto";
import * as mappers from "../../services/CustomerMappers";

export const customerMiddleware = ({dispatch}: MiddlewareAPI) => (next: Dispatch) => (action: CustomerActions) => {
  switch (action.type) {
    case CustomerActionTypes.LOAD:
      handleLoadCustomer(action, dispatch);
      break;
  }

  next(action);
};

function handleLoadCustomer(action: CustomerActions, dispatch: any) {
  if (action.status === ActionStatus.REQUEST) {
    getCustomer(action.id)
      .then((customer: Partial<CustomerDTO>) =>
        dispatch(loadCustomerSucceded(action.id, mappers.dtoToCustomer(customer)))
      )
      .catch(() => dispatch(loadCustomerFailed(action.id)));
  }
}