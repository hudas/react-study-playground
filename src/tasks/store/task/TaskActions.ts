import {ActionStatus, RemoteAction} from "../../../Store";
import {Task} from "../../components/view/TaskView";

export type TaskActions = LoadTask;

export enum TaskActionTypes {
  LOAD = '[Task] LOAD',
  RESOLVE = '[Task] RESOLVE'
}

export interface LoadTask extends RemoteAction {
  id?: string;
  task?: Task;
}

export function loadTask(id: string): LoadTask {
  return {
    type: TaskActionTypes.LOAD,
    status: ActionStatus.REQUEST,
    id
  }
}

export function loadTaskSuccess(task: Task): LoadTask {
  return {
    type: TaskActionTypes.LOAD,
    status: ActionStatus.SUCCESS,
    task
  }
}

export function loadTaskFailed(): LoadTask {
  return {
    type: TaskActionTypes.LOAD,
    status: ActionStatus.FAILURE
  }
}

export interface ResolveTask extends RemoteAction {
  id?: string;
}

export function resolveTask(id: string): ResolveTask {
  return {
    type: TaskActionTypes.RESOLVE,
    status: ActionStatus.REQUEST,
    id
  }
}

export function resolveTaskSuccess(id: string) {
  return {
    type: TaskActionTypes.RESOLVE,
    status: ActionStatus.SUCCESS,
    id
  }
}

export function resolveTaskFailed() {
  return {
    type: TaskActionTypes.RESOLVE,
    status: ActionStatus.FAILURE,
  }
}
