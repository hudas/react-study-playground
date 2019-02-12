import {TableCell, TableHead, TableRow} from "@material-ui/core";
import React from "react";


export function TaskListColumns() {
  return (
      <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Created at</TableCell>
          <TableCell>Created by</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Actions</TableCell>
      </TableRow>
  );
}