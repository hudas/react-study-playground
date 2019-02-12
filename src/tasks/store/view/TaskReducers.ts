import {INITIAL_TASK_STATE, TaskState} from "./TaskState";
import {TaskActions, TaskActionTypes} from "./TaskActions";
import produce from "immer";
import {ActionStatus} from "../../../Store";
import {Task} from "../../components/view/TaskView";

export function reduceTask(state: TaskState = INITIAL_TASK_STATE, action: TaskActions) {
  return produce(state, (draft: TaskState) => {

    switch (action.type) {
      case TaskActionTypes.LOAD:
        if (action.status === ActionStatus.SUCCESS) {
          draft.task = action.task as Task;
        }
    }
  });
}