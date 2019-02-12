import React, {Component} from "react";
import {TaskList, TaskRow} from "../../components/list/TaskList";
import {getAllTasks} from "../../store/list/TaskListSelectors";
import {loadTaskList} from "../../store/list/TaskListActions";
import { connect } from 'react-redux'
import {AppState} from "../../../Store";

export interface TaskListPageProps {
  tasks: TaskRow[];
  loadTasks: () => void;
}

class TaskListPage extends Component<TaskListPageProps> {

  componentDidMount(): void {
    this.props.loadTasks();
  }

  render(): React.ReactNode {
    return (
      <TaskList rows={this.props.tasks}/>
    );
  }
}


const mapStateToProps = (state: AppState) => ({
  tasks: getAllTasks(state)
});

const mapDispatchToProps = (dispatch: any) => ({
  loadTasks: () => dispatch(loadTaskList())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskListPage);
