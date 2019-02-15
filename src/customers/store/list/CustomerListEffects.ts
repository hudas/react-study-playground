import {
  loadCustomerList,
  loadCustomerListFailed,
  loadCustomerListSucceded
} from "./CustomerListActions";
import {AppState} from "../../../Store";
import {isListLoading} from "./CustomerListSelectors";
import {getCustomerList} from "../../services/CustomerService";
import {CustomerRow} from "../../components/list/CustomerList";

export function loadCustomerListEffect() {
  return (dispatch: any, getState: () => AppState) => {
    if (isListLoading(getState())) {
      return;
    }

    dispatch(loadCustomerList());
    return getCustomerList()
      .then((rows: CustomerRow[]) => dispatch(loadCustomerListSucceded(rows)))
      .catch(() => dispatch(loadCustomerListFailed()))
  }
}