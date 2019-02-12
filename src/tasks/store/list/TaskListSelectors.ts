import {AppState} from "../../../Store";
import {TaskListState} from "./TaskListState";

const getTaskListState = (state: AppState) => {
  return state.taskList;
};

export const getAllTasks = (state: AppState) => {
  const listState: TaskListState = getTaskListState(state);
  return listState.rows;
};