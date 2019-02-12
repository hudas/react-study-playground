import {Action} from "redux";

export type TaskListActions = LoadTaskList;

export enum TaskListActionTypes {
  LOAD = '[Task.list] LOAD'
}

export interface LoadTaskList extends Action {
  readonly type: TaskListActionTypes.LOAD;
}

export function loadTaskListFactory(): LoadTaskList {
  return { type: TaskListActionTypes.LOAD };
}