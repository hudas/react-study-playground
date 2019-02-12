import React, {Component} from "react";
import {TaskList, TaskRow} from "../../components/list/TaskList";
import {getTaskList} from "../../services/TaskService";
import {TaskListDto} from "../../services/dto/TaskListDto";
import {taskListDtoToRow} from "../../services/TaskMappers";

export interface TaskListPageState {
  rows: TaskRow[];
}

const INITIAL_STATE: TaskListPageState = {
  rows: []
};

export class TaskListPage extends Component<{}, TaskListPageState> {

  constructor(props: TaskListPageState) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount(): void {
    this.loadTaskList();
  }

  render(): React.ReactNode {
    return <TaskList rows={this.state.rows}/>;
  }

  private loadTaskList() {
    getTaskList()
      .then((tasks: Partial<TaskListDto>[]) =>
        this.setState({
          rows: taskListDtoToRow(tasks) as TaskRow[]
        })
      );
  }
}