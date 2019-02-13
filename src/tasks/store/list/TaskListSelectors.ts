import {AppState} from "../../../Store";
import {TaskListState} from "./TaskListState";
import {TaskStatus} from "../task/TaskState";
import {TaskRow} from "../../components/list/TaskList";

const getTaskListState = (state: AppState) => state.taskList;

export const getAllTasks = (state: AppState): TaskRow[] => {
  const listState: TaskListState = getTaskListState(state);
  return listState.rows;
};

export const getOpenTasks = (state: AppState): TaskRow[] => {
  const listState: TaskListState = getTaskListState(state);

  return listState.rows.filter(task => task.status === TaskStatus.OPEN);
};

export const isListLoading = (state: AppState): boolean => {
  const listState: TaskListState = getTaskListState(state);

  return listState.loading;
};