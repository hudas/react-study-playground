import React, {Component} from "react";
import {TaskList, TaskRow} from "../../components/list/TaskList";
import {getAllTasks} from "../../store/list/TaskListSelectors";
import {loadTaskList} from "../../store/list/TaskListActions";
import { connect } from 'react-redux'
import {AppState} from "../../../Store";
import {RouteComponentProps} from "react-router";
import {resolveTask} from "../../store/task/TaskActions";

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
  loadTasks: () => dispatch(loadTaskList()),
  resolveTask: (id: string) => dispatch(resolveTask(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskListPage);
