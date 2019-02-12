import React, {Component} from "react";
import {Task, TaskView} from "../../components/view/TaskView";
import {RouteComponentProps} from "react-router";
import axios, {AxiosResponse} from "axios";
import moment, {Moment} from "moment";
import {getTask} from "../../services/TaskService";
import {taskDtoToFormState} from "../../services/TaskMappers";
import {TaskDto} from "../../services/dto/TaskDto";

export type TaskViewPageProps = RouteComponentProps<TaskViewRouteParams>;

export interface TaskViewRouteParams {
  id: string;
}

export interface TaskViewPageState {
  value: Task;
}


const INITIAL_STATE: TaskViewPageState = {
  value: {
    id: '',
    name: '',
    description: '',
    status: '',
    createdAt: null,
    createdBy: '',
    comments: []
  }
};

export class TaskViewPage extends Component<TaskViewPageProps, TaskViewPageState> {

  constructor(props: TaskViewPageProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount(): void {
    this.loadTask();
  }

  render(): React.ReactNode {
    return (
      <TaskView task={this.state.value}/>
    );
  }

  private loadTask() {
    getTask(this.props.match.params.id)
      .then((taskDto: Partial<TaskDto>) =>
        this.setState({
          value: taskDtoToFormState(taskDto) as Task
        })
      );
  }
}