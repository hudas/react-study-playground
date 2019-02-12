import {ActionStatus, RemoteAction} from "../../../Store";
import {TaskRow} from "../../components/list/TaskList";

export type TaskListActions = LoadTaskList;

export enum TaskListActionTypes {
  LOAD = '[Task.list] LOAD'
}

export interface LoadTaskList extends RemoteAction {
  tasks?: TaskRow[];
}

export function loadTaskList(): LoadTaskList {
  return {
    type: TaskListActionTypes.LOAD,
    status: ActionStatus.REQUEST
  };
}

export function loadTaskListSucceded(tasks: TaskRow[]): LoadTaskList {
  return {
    type: TaskListActionTypes.LOAD,
    status: ActionStatus.SUCCESS,
    tasks
  };
}

export function loadTaskListFailed(): LoadTaskList {
  return {
    type: TaskListActionTypes.LOAD,
    status: ActionStatus.FAILURE
  };
}