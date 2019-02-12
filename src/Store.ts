import {Action, applyMiddleware, combineReducers, createStore, Store} from "redux";
import {reduceTaskList} from "./tasks/store/list/TaskListReducers";
import {composeWithDevTools} from "redux-devtools-extension";
import {TaskListState} from "./tasks/store/list/TaskListState";
import {taskListMiddleware} from "./tasks/store/list/TaskListMiddleware";
import {TaskState} from "./tasks/store/task/TaskState";
import {reduceTask} from "./tasks/store/task/TaskReducers";
import {taskMiddleware} from "./tasks/store/task/TaskMiddleware";

export enum ActionStatus {
  REQUEST = 'REQUEST',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE'
}

export interface RemoteAction extends Action {
  status: ActionStatus;
}

export interface AppState {
  taskList: TaskListState;
  task: TaskState;
}

export function configureStore(): Store<AppState, Action> {
  try {
    const rootReducer = combineReducers<AppState>({
      taskList: reduceTaskList,
      task: reduceTask
    });

    const middlewares = [taskListMiddleware, taskMiddleware];

    return createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

