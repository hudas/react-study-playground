import {TaskRow} from "../../list/TaskList";
import {TaskNotificationListItem} from "../notification-list-item/TaskNotificationListItem";
import {Menu} from "@material-ui/core";
import React from "react";

export interface TaskNotificationListProps {
  displayNextTo: HTMLElement | null;
  tasks: TaskRow[];
  onClose: () => void;
  onSelected: (id: string) => void;
}

export function TaskNotificationList({tasks, displayNextTo, onClose, onSelected}: TaskNotificationListProps) {
  return (
    <Menu
      anchorEl={displayNextTo}
      open={!!displayNextTo}
      onClose={onClose}
    >
      {tasks.map(task => (
        <TaskNotificationListItem
          key={task.id}
          task={task}
          onSelection={onSelected}
        />
      ))}
    </Menu>
  );
}