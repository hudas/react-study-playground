import {TaskRow} from "../TaskList";
import {TableCell, TableRow} from "@material-ui/core";
import {EmbeddedButton} from "../../../../lib/buttons/EmbeddedButton";
import {Link} from "react-router-dom";
import React from "react";

export interface TaskListRowProps {
  task: TaskRow;
}

export function TaskListRow({task}: TaskListRowProps) {
  return (
    <TableRow>
      <TableCell>{task.name}</TableCell>
      <TableCell>{task.createdAt.toISOString()}</TableCell>
      <TableCell>{task.createdBy}</TableCell>
      <TableCell>{task.status}</TableCell>
      <TableCell>
        <EmbeddedButton>
          <Link to={`/task/${task.id}`}>View</Link>
        </EmbeddedButton>
      </TableCell>
    </TableRow>
  );
}