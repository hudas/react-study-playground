import {Task} from "../../components/view/TaskView";

export interface TaskState {
  task: Task;
}

export const INITIAL_TASK_STATE: TaskState = {
  task: {
    id: '',
    name: '',
    description: '',
    status: '',
    createdAt: null,
    createdBy: '',
    comments: []
  }
};