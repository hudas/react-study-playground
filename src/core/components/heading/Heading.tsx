import React, {Component} from 'react';
import style from './Heading.module.scss';
import {Logo} from "./logo/Logo";
import {HeadingLinks} from "./links/HeadingLinks";
import {PrimaryButton} from "../../../lib/buttons/PrimaryButton";
import {TaskNotification} from "../../../tasks/components/notification/TaskNotification";
import {connect} from "react-redux";
import {AppState} from "../../../Store";
import {getOpenTasks} from "../../../tasks/store/list/TaskListSelectors";
import {TaskRow} from "../../../tasks/components/list/TaskList";
import {RouteComponentProps} from "react-router";
import {
  withRouter
} from 'react-router-dom'
import {loadTaskListEffect} from "../../../tasks/store/list/TaskListEffects";

export interface HeadingProps extends RouteComponentProps {
  openTasks: TaskRow[];
  loadTasks: () => void;
  onLogout: () => void;
}

class Heading extends Component<HeadingProps> {

  handleTaskSelection = (id: string) => {
    this.props.history.push(`/task/${id}`);
  };

  constructor(props: HeadingProps) {
    super(props);
  }

  componentDidMount(): void {
    this.props.loadTasks();
  }

  render(): React.ReactNode {
    return (
      <div className={style.container}>
        <Logo/>
        <div>
          <h1 className="title">Study app heading</h1>
          <HeadingLinks/>
        </div>
        <TaskNotification
          tasks={this.props.openTasks}
          onSelection={this.handleTaskSelection}
        />
        <PrimaryButton onClick={this.props.onLogout}>
          Logout
        </PrimaryButton>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  openTasks: getOpenTasks(state)
});

const mapDispatchToProps = (dispatch: any) => ({
  loadTasks: () => dispatch(loadTaskListEffect())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Heading));