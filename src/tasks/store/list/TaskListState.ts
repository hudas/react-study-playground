import {TaskRow} from "../../components/list/TaskList";

export interface TaskListState {
  rows: TaskRow[];
}

export const INITIAL_TASK_LIST_STATE: TaskListState = {
  rows: []
};