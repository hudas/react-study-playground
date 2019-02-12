import {TaskComment} from "../TaskView";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import React from "react";
import {FormPanel} from "../../../../lib/panels/form-panel/FormPanel";

export interface TaskCommentsViewProps {
  comments: TaskComment[];
}

export function TaskCommentsView({comments}: TaskCommentsViewProps) {
  return (
    <FormPanel title="Comments">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Comment</TableCell>
            <TableCell>Commentted by</TableCell>
            <TableCell>Commentted at</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            comments.map((comment: TaskComment) => (
              <TableRow key={comment.id}>
                <TableCell>{comment.text}</TableCell>
                <TableCell>{comment.createdBy}</TableCell>
                <TableCell>{comment.createdAt && comment.createdAt.toISOString()}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </FormPanel>
  );
}