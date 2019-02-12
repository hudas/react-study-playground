import {Task} from "../../components/view/TaskView";

export enum TaskStatus {
  OPEN = 'OPEN',
  RESOLVED = 'RESOLVED'
}

export interface TaskState {
  task: Task;
}

export const INITIAL_TASK_STATE: TaskState = {
  task: {
    id: '',
    name: '',
    description: '',
    status: null,
    createdAt: null,
    createdBy: '',
    comments: []
  }
};