import {
  LoadTaskList,
  loadTaskListFailed,
  loadTaskListSucceded,
  resolveTaskListItem,
  TaskListActionTypes
} from "./TaskListActions";
import {Action, Dispatch, MiddlewareAPI} from "redux";
import {ActionStatus, AppState} from "../../../Store";
import {getTaskList} from "../../services/TaskService";
import {TaskListDto} from "../../services/dto/TaskListDto";
import {taskListDtoToRow} from "../../services/TaskMappers";
import {TaskRow} from "../../components/list/TaskList";
import {ResolveTask, TaskActionTypes} from "../task/TaskActions";
import {isListLoading} from "./TaskListSelectors";


export const taskListMiddleware = ({ dispatch, getState }: MiddlewareAPI) => (next: Dispatch) => (action: Action) => {
  switch (action.type) {
    case TaskListActionTypes.LOAD:
      handleLoadTaskList(action as LoadTaskList, getState, dispatch);
      break;
    case TaskActionTypes.RESOLVE:
      handleTaskListItemResolution(action as ResolveTask, dispatch);
      break;
    default:

  }

  return next(action);
};

function handleLoadTaskList(action: LoadTaskList, getState: () => AppState, dispatch: any) {
  if (action.status === ActionStatus.REQUEST && !isListLoading(getState())) {
    getTaskList()
      .then((listDto: TaskListDto[]) => taskListDtoToRow(listDto) as TaskRow[])
      .then((rows: TaskRow[]) => dispatch(loadTaskListSucceded(rows)))
      .catch((() => dispatch(loadTaskListFailed())));
  }
}

function handleTaskListItemResolution(action: ResolveTask, dispatch: any) {
  if (action.status === ActionStatus.SUCCESS) {
    dispatch(resolveTaskListItem((action.id)));
  }
}