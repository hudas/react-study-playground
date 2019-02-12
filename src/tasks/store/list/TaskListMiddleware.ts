import {loadTaskListFailed, loadTaskListSucceded, TaskListActions, TaskListActionTypes} from "./TaskListActions";
import {Dispatch, MiddlewareAPI} from "redux";
import {ActionStatus} from "../../../Store";
import {getTaskList} from "../../services/TaskService";
import {TaskListDto} from "../../services/dto/TaskListDto";
import {taskListDtoToRow} from "../../services/TaskMappers";
import {TaskRow} from "../../components/list/TaskList";

export function taskListMiddleware({ dispatch }: MiddlewareAPI) {
  return function(next: Dispatch) {
    return function(action: TaskListActions) {

      if (action.type === TaskListActionTypes.LOAD && action.status === ActionStatus.REQUEST) {
        getTaskList()
          .then((response: TaskListDto[]) => taskListDtoToRow(response) as TaskRow[])
          .then((rows: TaskRow[]) => dispatch(loadTaskListSucceded(rows)))
          .catch((() => dispatch(loadTaskListFailed())));
      }

      return next(action);
    };
  };
}