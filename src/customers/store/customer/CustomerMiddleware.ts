import {Dispatch, MiddlewareAPI} from "redux";
import {CustomerActions, CustomerActionTypes,} from "./actions/CustomerActions";
import {ActionStatus, AppState} from "../../../Store";
import {CustomerDTO} from "../../services/dto/CustomerUpdateDto";
import {loadCustomer, LoadCustomer, loadCustomerFailed, loadCustomerSucceeded} from "./actions/LoadCustomerAction";
import {SubmitCustomer, submitCustomerFailed, submitCustomerSucceeded} from "./actions/SubmitCustomerActions";
import * as mappers from "../../services/CustomerMappers";
import * as services from "../../services/CustomerService";
import * as selectors from "./CustomerSelectors";
import {PrepareCustomerForm} from "./actions/PrepareCustomerFormAction";
import {clearCustomer} from "./actions/ClearCustomerAction";

export const customerMiddleware = ({dispatch, getState}: MiddlewareAPI) => (next: Dispatch) => (action: CustomerActions) => {
  switch (action.type) {
    case CustomerActionTypes.PREPARE_FORM:
      handlePrepareForm(action, dispatch);
      break;
    case CustomerActionTypes.LOAD:
      handleLoadCustomer(action, dispatch);
      break;
    case CustomerActionTypes.SUBMIT:
      handleSubmitCustomer(action, dispatch, getState);
      break;
  }

  next(action);
};

function handlePrepareForm(action: PrepareCustomerForm, dispatch) {
  if (!action.existingId) {
    dispatch(clearCustomer());
    return;
  }

  dispatch(loadCustomer(action.existingId));
}

function handleLoadCustomer(action: LoadCustomer, dispatch: any) {
  if (action.status === ActionStatus.REQUEST) {
    services.getCustomer(action.id)
      .then((customer: Partial<CustomerDTO>) =>
        dispatch(loadCustomerSucceeded(action.id, mappers.dtoToCustomer(customer)))
      )
      .catch(() => dispatch(loadCustomerFailed(action.id)));
  }
}

function handleSubmitCustomer(action: SubmitCustomer, dispatch: any, getState: () => AppState) {
  if (action.status === ActionStatus.REQUEST) {
    const existingId = action.id;
    const dto: Partial<CustomerDTO> = mappers.customerFormStateToDto(selectors.getCustomer(getState()));

    const update = existingId ? services.updateCustomer(existingId, dto) : services.createCustomer(dto);

    update.then(() => dispatch(submitCustomerSucceeded(existingId)))
      .catch(() => dispatch(submitCustomerFailed(existingId)));
  }
}