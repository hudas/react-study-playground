import {Moment} from "moment";
import {Table, TableBody, TableHead} from "@material-ui/core";
import React from "react";
import {TaskListRow} from "./list-row/TaskListRow";
import {TaskListColumns} from "./list-columns/TaskListColumns";

export interface TaskListProps {
  rows: TaskRow[];
}

export interface TaskRow {
  id: string;
  name: string;
  createdBy: string;
  createdAt: Moment;
  status: string;
}

export function TaskList({rows}: TaskListProps) {
  return (
    <Table>
      <TableHead>
        <TaskListColumns/>
      </TableHead>
      <TableBody>
        {rows.map(task => <TaskListRow key={task.id} task={task}/>)}
      </TableBody>
    </Table>
  );
}