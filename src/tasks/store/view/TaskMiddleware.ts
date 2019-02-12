import {Dispatch, MiddlewareAPI} from "redux";
import {loadTaskFailed, loadTaskSuccess, TaskActions, TaskActionTypes} from "./TaskActions";
import {ActionStatus} from "../../../Store";
import {getTask} from "../../services/TaskService";
import {TaskDto} from "../../services/dto/TaskDto";
import {taskDtoToFormState} from "../../services/TaskMappers";
import {Task} from "../../components/view/TaskView";

export const taskMiddleware = ({dispatch}: MiddlewareAPI) => (next: Dispatch) => (action: TaskActions) => {
  if (action.type === TaskActionTypes.LOAD && action.status == ActionStatus.REQUEST) {
    getTask(action.id as string)
      .then((taskDto: Partial<TaskDto>) => taskDtoToFormState(taskDto) as Task)
      .then((task: Task) => dispatch(loadTaskSuccess(task)))
      .catch(() => dispatch(loadTaskFailed()))
  }

  return next(action);
};