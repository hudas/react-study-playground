import React, {Component} from "react";
import {Task, TaskView} from "../../components/view/TaskView";
import {RouteComponentProps} from "react-router";
import {connect} from "react-redux";
import {AppState} from "../../../Store";
import {getTask} from "../../store/task/TaskSelectors";
import {loadTask, resolveTask} from "../../store/task/TaskActions";
import {PrimaryButton} from "../../../lib/buttons/PrimaryButton";
import {TaskStatus} from "../../store/task/TaskState";

export interface TaskViewPageProps extends RouteComponentProps<TaskViewRouteParams> {
  task: Task;
  loadTask: (id: string) => void;
  resolveTask: (id: string) => void;
}

export interface TaskViewRouteParams {
  id: string;
}

class TaskViewPage extends Component<TaskViewPageProps, any> {

  componentDidMount(): void {
    this.props.loadTask(this.props.match.params.id);
  }

  resolutionHandler = () => {
    this.props.resolveTask(this.props.match.params.id);
  };

  render(): React.ReactNode {
    return (
      <>
        <TaskView task={this.props.task}/>
        {this.props.task.status === TaskStatus.OPEN && <PrimaryButton onClick={this.resolutionHandler}>Resolve</PrimaryButton>}
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  task: getTask(state)
});

const mapDispatchToProps = (dispatch: any) => ({
  loadTask: (id: string) => dispatch(loadTask(id)),
  resolveTask: (id: string) => dispatch(resolveTask(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskViewPage);