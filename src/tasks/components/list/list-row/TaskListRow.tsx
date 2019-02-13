import {TaskRow} from "../TaskList";
import {TableCell, TableRow} from "@material-ui/core";
import {EmbeddedButton} from "../../../../lib/buttons/EmbeddedButton";
import {Link} from "react-router-dom";
import React from "react";

export interface TaskListRowProps {
  task: TaskRow;
  onView: (id: string) => void;
  onResolve: (id: string) => void;
}

export function TaskListRow({task, onResolve, onView}: TaskListRowProps) {
  return (
    <TableRow>
      <TableCell>{task.name}</TableCell>
      <TableCell>{task.createdAt.toISOString()}</TableCell>
      <TableCell>{task.createdBy}</TableCell>
      <TableCell>{task.status}</TableCell>
      <TableCell>
        <EmbeddedButton onClick={() => onView(task.id)}>View</EmbeddedButton>
        <EmbeddedButton onClick={() => onResolve(task.id)}>Resolve</EmbeddedButton>
      </TableCell>
    </TableRow>
  );
}