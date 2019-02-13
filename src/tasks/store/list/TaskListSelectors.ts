import {AppState} from "../../../Store";
import {TaskStatus} from "../task/TaskState";
import {TaskRow} from "../../components/list/TaskList";

const getTaskListState = (state: AppState) => state.taskList;

export const getAllTasks = (state: AppState): TaskRow[] => getTaskListState(state).rows;

export const getOpenTasks = (state: AppState): TaskRow[] => getAllTasks(state)
  .filter(task => task.status === TaskStatus.OPEN);

export const isListLoading = (state: AppState): boolean => getTaskListState(state).loading;