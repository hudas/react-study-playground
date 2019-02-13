import {INITIAL_TASK_LIST_STATE, TaskListState} from "./TaskListState";
import {TaskListActions, TaskListActionTypes} from "./TaskListActions";
import produce from "immer";
import {ActionStatus} from "../../../Store";
import {TaskRow} from "../../components/list/TaskList";
import {TaskStatus} from "../task/TaskState";

export function reduceTaskList(state: TaskListState = INITIAL_TASK_LIST_STATE, action: TaskListActions) {
  return produce(state, (draft: TaskListState) => {

    switch (action.type) {
      case TaskListActionTypes.LOAD:
        if (action.status === ActionStatus.REQUEST) {
          draft.loading = true;
        } else if (action.status === ActionStatus.SUCCESS) {
          draft.rows = action.tasks as TaskRow[];
          draft.loading = false
        } else {
          draft.loading = false
        }
        break;
      case TaskListActionTypes.RESOLVE_LIST_ITEM:
        const resolvedItem = draft.rows.find(row => row.id === action.id);

        resolvedItem.status = TaskStatus.RESOLVED;
        break;
      default:
        // do nothing
    }
  });
}