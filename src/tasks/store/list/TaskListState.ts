import {TaskRow} from "../../components/list/TaskList";

export interface TaskListState {
  rows: TaskRow[];
  loading: boolean;
}

export const INITIAL_TASK_LIST_STATE: TaskListState = {
  rows: [],
  loading: false
};