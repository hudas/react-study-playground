import {ActionStatus, AppAction} from "../../../Store";
import {Task} from "../../components/view/TaskView";

export type TaskActions = LoadTask;

export enum TaskActionTypes {
  LOAD = '[Task] LOAD'
}

export interface LoadTask extends AppAction {
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




