import {
  loadTask,
  loadTaskFailed,
  loadTaskSuccess, resolveTask,
  resolveTaskFailed,
  resolveTaskSuccess,
} from "./TaskActions";
import {getTask, updateTaskStatus} from "../../services/TaskService";
import {TaskDto} from "../../services/dto/TaskDto";
import {taskDtoToFormState, taskStatusToDto} from "../../services/TaskMappers";
import {Task} from "../../components/view/TaskView";
import {EntityId} from "../../../lib/integration/Response";
import {TaskStatus} from "./TaskState";
import {resolveTaskListItem} from "../list/TaskListActions";


export function loadTaskEffect(id: string) {
  return (dispatch: any) => {
    console.log('inside effect');
    dispatch(loadTask(id));

    return getTask(id)
      .then((taskDto: Partial<TaskDto>) => taskDtoToFormState(taskDto) as Task)
      .then((task: Task) => dispatch(loadTaskSuccess(task)))
      .catch(() => dispatch(loadTaskFailed()))
  }
}

export function resolveTaskEffect(id: string) {
  return (dispatch: any) => {
    dispatch(resolveTask(id));

    return updateTaskStatus(id, taskStatusToDto(TaskStatus.RESOLVED))
      .then((updatedResource: EntityId) => {
        dispatch(resolveTaskListItem(id));
        dispatch(resolveTaskSuccess(updatedResource.id))
      })
      .catch(() => dispatch(resolveTaskFailed()))
  }
}