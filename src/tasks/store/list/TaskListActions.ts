import {ActionStatus, RemoteAction} from "../../../Store";
import {TaskRow} from "../../components/list/TaskList";
import {Action} from "redux";

export type TaskListActions = LoadTaskList |
  ResolveTaskListItem;

export enum TaskListActionTypes {
  LOAD = '[Task.list] LOAD',
  RESOLVE_LIST_ITEM = '[Task.list] RESOLVE_LIST_ITEM'
}

export interface LoadTaskList extends RemoteAction {
  readonly type: TaskListActionTypes.LOAD;
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

export interface ResolveTaskListItem extends Action {
  readonly type: TaskListActionTypes.RESOLVE_LIST_ITEM;
  id: string;
}

export function resolveTaskListItem(id: string): ResolveTaskListItem {
  return {
    type: TaskListActionTypes.RESOLVE_LIST_ITEM,
    id
  };
}
