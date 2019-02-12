import {Moment} from "moment";
import React from "react";
import {TaskCommentsView} from "./comments/TaskCommentsView";
import {TaskViewGeneralDetails} from "./details/TaskViewGeneralDetails";

export interface Task {
  id: string;
  name: string;
  description: string;
  createdAt: Moment | null;
  createdBy: string;
  comments: TaskComment[];
  resolvedAt?: Moment | null;
  status: string;
}

export interface TaskComment {
  id: string;
  text: string;
  createdAt: Moment;
  createdBy: string;
}

export interface TaskViewProps {
  task: Task;
}

export function TaskView({ task }: TaskViewProps) {
  return (
    <>
      <TaskViewGeneralDetails task={task}/>
      <TaskCommentsView comments={task.comments}/>
    </>
  );
}