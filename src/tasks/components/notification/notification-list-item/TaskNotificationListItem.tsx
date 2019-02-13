import {TaskRow} from "../../list/TaskList";
import {ListItem, ListItemText, MenuItem} from "@material-ui/core";
import moment from "moment";
import React from "react";

export interface TaskNotificationListItemProps {
  task: TaskRow;
  onSelection: (id: string) => void;
}

export function TaskNotificationListItem({task, onSelection}: TaskNotificationListItemProps) {
  return (
    <MenuItem
      key={task.id}
      onClick={() => onSelection(task.id)}
    >
      <ListItemText
        primary={task.name}
        secondary={`Created before: ${moment.duration(moment().diff(task.createdAt)).humanize()}`}
      />
    </MenuItem>
  );
}