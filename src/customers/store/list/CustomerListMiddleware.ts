import {Dispatch, MiddlewareAPI} from "redux";
import {
  CustomerListActions,
  CustomerListActionTypes,
  loadCustomerListFailed,
  loadCustomerListSucceded
} from "./CustomerListActions";
import {ActionStatus, AppState} from "../../../Store";
import {isListLoading} from "./CustomerListSelectors";
import {getCustomerList} from "../../services/CustomerService";
import {CustomerRow} from "../../components/list/CustomerList";

export const customerListMiddleware = ({dispatch, getState}: MiddlewareAPI) => (next: Dispatch) => (action: CustomerListActions) => {
  switch (action.type) {
    case CustomerListActionTypes.LOAD:
      handleLoadCustomerList(action, getState, dispatch);
      break;
  }

  next(action);
};

function handleLoadCustomerList(action: CustomerListActions, getState: () => AppState, dispatch: any) {
  if (action.status === ActionStatus.REQUEST && !isListLoading(getState())) {
    getCustomerList()
      .then((rows: CustomerRow[]) => dispatch(loadCustomerListSucceded(rows)))
      .catch(() => dispatch(loadCustomerListFailed()))
  }
}