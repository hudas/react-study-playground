import {TableCell, TableRow} from "@material-ui/core";
import React from "react";

export function CustomerListColumnHeadings() {
  return (
    <TableRow>
      <TableCell>Name</TableCell>
      <TableCell>Address</TableCell>
      <TableCell>Subscriptions</TableCell>
      <TableCell>Actions</TableCell>
    </TableRow>
  );
}