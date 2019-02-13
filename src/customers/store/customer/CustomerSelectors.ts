import {AppState} from "../../../Store";

const getCustomerState = (state: AppState) => state.customer;

export const getCustomer = (state: AppState) => getCustomerState(state).customer;

export const isCustomerUpdated = (state: AppState) => getCustomerState(state).updated;