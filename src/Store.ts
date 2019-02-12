import {Action, applyMiddleware, combineReducers, createStore, Store} from "redux";
import {reduceTaskList} from "./tasks/store/list/TaskListReducers";
import {composeWithDevTools} from "redux-devtools-extension";
import {TaskListState} from "./tasks/store/list/TaskListState";
import {taskListMiddleware} from "./tasks/store/list/TaskListMiddleware";

export enum ActionStatus {
  REQUEST = 'REQUEST',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE'
}


export interface AppAction extends Action {
  status: ActionStatus;
}

export interface AppState {
  taskList: TaskListState;
}

export function configureStore(): Store<AppState, Action> {
  const rootReducer = combineReducers<AppState>({
    taskList: reduceTaskList
  });

  const middlewares = [taskListMiddleware];

  return createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));
}

