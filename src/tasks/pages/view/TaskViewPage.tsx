import React, {Component} from "react";
import {Task, TaskView} from "../../components/view/TaskView";
import {RouteComponentProps} from "react-router";
import {connect} from "react-redux";
import {AppState} from "../../../Store";
import {getTask} from "../../store/view/TaskSelectors";
import {loadTask} from "../../store/view/TaskActions";

export interface TaskViewPageProps extends RouteComponentProps<TaskViewRouteParams> {
  task: Task;
  loadTask: (id: string) => void;
}

export interface TaskViewRouteParams {
  id: string;
}


class TaskViewPage extends Component<TaskViewPageProps, any> {

  componentDidMount(): void {
    this.props.loadTask(this.props.match.params.id);
  }

  render(): React.ReactNode {
    return (
      <TaskView task={this.props.task}/>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  task: getTask(state)
});

const mapDispatchToProps = (dispatch: any) => ({
  loadTask: (id: string) => dispatch(loadTask(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskViewPage);