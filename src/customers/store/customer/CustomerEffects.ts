import {Dispatch} from "redux";
import {AppState} from "../../../Store";
import {CustomerDTO} from "../../services/dto/CustomerUpdateDto";
import {loadCustomer, loadCustomerFailed, loadCustomerSucceeded} from "./actions/LoadCustomerAction";
import {submitCustomerFailed, submitCustomerSucceeded} from "./actions/SubmitCustomerActions";
import * as mappers from "../../services/CustomerMappers";
import * as services from "../../services/CustomerService";
import * as selectors from "./CustomerSelectors";
import {clearCustomer} from "./actions/ClearCustomerAction";


export function prepareFormEffect(existingId?: string) {
  return (dispatch: any) => {
    if (!existingId) {
      dispatch(clearCustomer());
      return;
    }

    return dispatch(loadCustomerEffect(existingId));
  }
}

export function loadCustomerEffect(id: string) {
  return (dispatch: Dispatch) => {
    dispatch(loadCustomer(id));

    return services.getCustomer(id)
      .then((customer: Partial<CustomerDTO>) =>
        dispatch(loadCustomerSucceeded(id, mappers.dtoToCustomer(customer)))
      )
      .catch(() => dispatch(loadCustomerFailed(id)));
  }
}

export function submitCustomerEffect() {
  return (dispatch: any, getState: () => AppState) => {
    const formValue = selectors.getCustomer(getState());
    const existingCustomerId = formValue.id;
    const dto: Partial<CustomerDTO> = mappers.customerFormStateToDto(selectors.getCustomer(getState()));

    const update = existingCustomerId ? services.updateCustomer(existingCustomerId, dto) : services.createCustomer(dto);

    return update
      .then(() => dispatch(submitCustomerSucceeded(existingCustomerId)))
      .catch(() => dispatch(submitCustomerFailed(existingCustomerId)));
  }
}