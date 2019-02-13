import React, {Component, createRef, RefObject} from "react";
import {TaskRow} from "../list/TaskList";
import {TaskNotificationList} from "./notification-list/TaskNotificationList";
import {TaskNotificationButton} from "./notification-button/TaskNotificationButton";

export interface TaskNotificationListProps {
  tasks: TaskRow[];
  onSelection: (id: string) => void;
}

export interface TaskNotificationListState {
  menuAnchorElement: HTMLElement | null;
}

export class TaskNotification extends Component<TaskNotificationListProps, TaskNotificationListState> {

  listContainerRef: RefObject<any>;

  attachMenu = () => {
    this.setState({
      menuAnchorElement: this.listContainerRef.current
    })
  };

  detachMenu = () => {
    this.setState({
      menuAnchorElement: null
    })
  };

  handleTaskSelection = (id: string) => {
    this.props.onSelection(id);
    this.detachMenu();
  };

  constructor(props: any) {
    super(props);
    this.state = {
      menuAnchorElement: null
    };
    this.listContainerRef = createRef<HTMLElement>();
  }

  render(): React.ReactNode {
    return (
      <div ref={this.listContainerRef}>
        My tasks
        <TaskNotificationButton
          onClick={this.attachMenu}
          taskCount={this.props.tasks.length}
        />
        <TaskNotificationList
          tasks={this.props.tasks}
          displayNextTo={this.state.menuAnchorElement}
          onClose={this.detachMenu}
          onSelected={this.handleTaskSelection}
        />
      </div>
    )
  }
}