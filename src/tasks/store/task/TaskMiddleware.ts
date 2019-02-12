import {Dispatch, MiddlewareAPI} from "redux";
import {
  loadTaskFailed,
  loadTaskSuccess,
  resolveTaskFailed,
  resolveTaskSuccess,
  TaskActions,
  TaskActionTypes
} from "./TaskActions";
import {ActionStatus} from "../../../Store";
import {getTask, updateTaskStatus} from "../../services/TaskService";
import {TaskDto} from "../../services/dto/TaskDto";
import {taskDtoToFormState, taskStatusToDto} from "../../services/TaskMappers";
import {Task} from "../../components/view/TaskView";
import {EntityId} from "../../../lib/integration/Response";
import {TaskStatus} from "./TaskState";

export const taskMiddleware = ({dispatch}: MiddlewareAPI) => (next: Dispatch) => (action: TaskActions) => {
  if (action.type === TaskActionTypes.LOAD && action.status === ActionStatus.REQUEST) {
    getTask(action.id as string)
      .then((taskDto: Partial<TaskDto>) => taskDtoToFormState(taskDto) as Task)
      .then((task: Task) => dispatch(loadTaskSuccess(task)))
      .catch(() => dispatch(loadTaskFailed()))
  }

  if (action.type === TaskActionTypes.RESOLVE) {
    if (action.status === ActionStatus.REQUEST) {
      updateTaskStatus(action.id as string, taskStatusToDto(TaskStatus.RESOLVED))
        .then((updatedResource: EntityId) => dispatch(resolveTaskSuccess(updatedResource.id)))
        .catch(() => dispatch(resolveTaskFailed()))
    }

    if (action.status === ActionStatus.SUCCESS) {
      // Will emit action to temporary update list.
    }
  }

  return next(action);
};