import {
  loadTaskList,
  loadTaskListFailed,
  loadTaskListSucceded,
} from "./TaskListActions";
import {AppState} from "../../../Store";
import {getTaskList} from "../../services/TaskService";
import {TaskListDto} from "../../services/dto/TaskListDto";
import {taskListDtoToRow} from "../../services/TaskMappers";
import {TaskRow} from "../../components/list/TaskList";
import {isListLoading} from "./TaskListSelectors";


export function loadTaskListEffect() {
  return (dispatch: any, getState: () => AppState) => {
    console.log('well im checking');
    console.log(getState());

    if (isListLoading(getState())) {
      return;
    }

    console.log('well im inside');
    dispatch(loadTaskList());
    return getTaskList()
      .then((listDto: TaskListDto[]) => taskListDtoToRow(listDto) as TaskRow[])
      .then((rows: TaskRow[]) => dispatch(loadTaskListSucceded(rows)))
      .catch((() => dispatch(loadTaskListFailed())));
  };
}