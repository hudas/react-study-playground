import {INITIAL_TASK_LIST_STATE, TaskListState} from "./TaskListState";
import {TaskListActions} from "./TaskListActions";
import produce from "immer";

export function reduceTaskList(state: TaskListState = INITIAL_TASK_LIST_STATE, action: TaskListActions) {
  return produce(state, (draft: TaskListState) => {
    console.log('Im reducer and i work' + action.type);

  });
}