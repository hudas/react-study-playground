import {INITIAL_TASK_LIST_STATE, TaskListState} from "./TaskListState";
import {TaskListActions, TaskListActionTypes} from "./TaskListActions";
import produce from "immer";
import {ActionStatus} from "../../../Store";
import {TaskRow} from "../../components/list/TaskList";

export function reduceTaskList(state: TaskListState = INITIAL_TASK_LIST_STATE, action: TaskListActions) {
  return produce(state, (draft: TaskListState) => {

    switch (action.type) {
      case TaskListActionTypes.LOAD:
        if (action.status === ActionStatus.SUCCESS) {
          draft.rows = action.tasks as TaskRow[];
        }
        break;
      default:
        // do nothing
    }
  });
}