import {Action, applyMiddleware, combineReducers, createStore, Store} from "redux";
import {reduceTaskList} from "./tasks/store/list/TaskListReducers";
import {composeWithDevTools} from "redux-devtools-extension";
import {TaskListState} from "./tasks/store/list/TaskListState";
import {taskListMiddleware} from "./tasks/store/list/TaskListMiddleware";

export interface AppState {
  taskList: TaskListState;
}

const rootReducer = combineReducers<AppState>({
  taskList: reduceTaskList
});

const middlewares = [taskListMiddleware];

export function configureStore(): Store<AppState, Action> {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));
}

