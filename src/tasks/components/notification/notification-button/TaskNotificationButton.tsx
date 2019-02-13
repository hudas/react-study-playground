import {Badge, Icon, IconButton} from "@material-ui/core";
import React from "react";

export interface TaskNotificationButtonProps {
  onClick: () => void;
  taskCount: number;
}

export function TaskNotificationButton({ taskCount, onClick }: TaskNotificationButtonProps) {


  return (
    <IconButton
      onClick={onClick}
    >
      {taskCount > 0 ? (
        <Badge badgeContent={taskCount} color="primary">
          <Icon className="fas fa-tasks"/>
        </Badge>
      ) : (
        <Icon className="fas fa-tasks"/>
      )
      }
    </IconButton>
  );
}