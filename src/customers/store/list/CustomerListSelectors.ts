import {AppState} from "../../../Store";

const getCustomerListState = (state: AppState) => state.customerList;

export const getAllCustomers = (state: AppState) => getCustomerListState(state).rows;

export const isListLoading = (status: AppState) => getCustomerListState(status).loading;