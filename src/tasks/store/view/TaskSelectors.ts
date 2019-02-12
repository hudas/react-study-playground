import {AppState} from "../../../Store";
import {TaskState} from "./TaskState";

const getTaskState = (state: AppState) => state.task;

export const getTask = (state: AppState) => {
  const task: TaskState = getTaskState(state);

  return task.task;
}