import {Action, applyMiddleware, combineReducers, createStore, Store} from "redux";
import {reduceTaskList} from "./tasks/store/list/TaskListReducers";
import {composeWithDevTools} from "redux-devtools-extension";
import {TaskListState} from "./tasks/store/list/TaskListState";
import {taskListMiddleware} from "./tasks/store/list/TaskListMiddleware";
import {TaskState} from "./tasks/store/task/TaskState";
import {reduceTask} from "./tasks/store/task/TaskReducers";
import {taskMiddleware} from "./tasks/store/task/TaskMiddleware";
import {CustomerListState} from "./customers/store/list/CustomerListState";
import {reduceCustomerList} from "./customers/store/list/CustomerListReducers";
import {customerListMiddleware} from "./customers/store/list/CustomerListMiddleware";
import {CustomerState} from "./customers/store/customer/CustomerState";
import {reduceCustomer} from "./customers/store/customer/CustomerReducers";
import {customerMiddleware} from "./customers/store/customer/CustomerMiddleware";
import {FormStateMap, reducer as formReducer} from 'redux-form'
import {productMiddleware} from "./products/store/product/ProductMiddleware";
import {ProductListState} from "./products/store/list/ProductListState";
import {reduceProductList} from "./products/store/list/ProductListReducers";
import {productListMiddleware} from "./products/store/list/ProductListMiddleware";
import {ProductState} from "./products/store/product/ProductState";
import {reduceProductState} from "./products/store/product/ProductReducers";

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

  const middlewares = [
    customerListMiddleware,
    customerMiddleware,
    taskListMiddleware,
    taskMiddleware,
    productMiddleware,
    productListMiddleware
  ];

  return createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
}

