import React, {Component} from "react";
import {TaskList, TaskRow} from "../../components/list/TaskList";
import {getAllTasks} from "../../store/list/TaskListSelectors";
import { connect } from 'react-redux'
import {AppState} from "../../../Store";
import {RouteComponentProps} from "react-router";
import {resolveTask} from "../../store/task/TaskActions";
import {loadTaskListEffect} from "../../store/list/TaskListEffects";
import {resolveTaskEffect} from "../../store/task/TaskEffects";

export interface TaskListPageProps extends RouteComponentProps {
  tasks: TaskRow[];
  loadTasks: () => void;
  resolveTask: (id: string) => void;
}

class TaskListPage extends Component<TaskListPageProps> {

  handleViewTask = (id: string) => {
    this.props.history.push(`/task/${id}`)
  };

  componentDidMount(): void {
    console.log('well im here in component');
    this.props.loadTasks();
  }

  render(): React.ReactNode {
    return (
      <TaskList
        rows={this.props.tasks}
        onViewTask={this.handleViewTask}
        onResolveTask={this.props.resolveTask}
      />
    );
  }
}


const mapStateToProps = (state: AppState) => ({
  tasks: getAllTasks(state)
});

const mapDispatchToProps = (dispatch: any) => ({
  loadTasks: () => dispatch(loadTaskListEffect()),
  resolveTask: (id: string) => dispatch(resolveTaskEffect(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskListPage);
