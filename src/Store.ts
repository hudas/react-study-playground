import {Action, applyMiddleware, combineReducers, createStore, Store} from "redux";
import {reduceTaskList} from "./tasks/store/list/TaskListReducers";
import {composeWithDevTools} from "redux-devtools-extension";
import {TaskListState} from "./tasks/store/list/TaskListState";
import {TaskState} from "./tasks/store/task/TaskState";
import {reduceTask} from "./tasks/store/task/TaskReducers";
import {CustomerListState} from "./customers/store/list/CustomerListState";
import {reduceCustomerList} from "./customers/store/list/CustomerListReducers";
import {CustomerState} from "./customers/store/customer/CustomerState";
import {reduceCustomer} from "./customers/store/customer/CustomerReducers";
import {FormStateMap, reducer as formReducer} from 'redux-form'
import {ProductListState} from "./products/store/list/ProductListState";
import {reduceProductList} from "./products/store/list/ProductListReducers";
import {ProductState} from "./products/store/product/ProductState";
import {reduceProductState} from "./products/store/product/ProductReducers";
import thunk from "redux-thunk";

export enum ActionStatus {
  REQUEST = 'REQUEST',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE'
}

export interface RemoteAction extends Action {
  status: ActionStatus;
}

export interface AppState {
  customerList: CustomerListState;
  customer: CustomerState;
  taskList: TaskListState;
  task: TaskState;
  productList: ProductListState;
  product: ProductState;
  form: FormStateMap;
}

export function configureStore(): Store<AppState, Action> {
  const rootReducer = combineReducers<AppState>({
    customerList: reduceCustomerList,
    customer: reduceCustomer,
    taskList: reduceTaskList,
    task: reduceTask,
    productList: reduceProductList,
    product: reduceProductState,
    form: formReducer
  });

  return createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );
}

