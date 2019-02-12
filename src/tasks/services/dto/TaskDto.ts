import {Moment} from "moment";

export interface TaskDto {
  id: string;
  name: string;
  description: string;
  createdAt: Moment;
  createdBy: string;
  comments: TaskCommentDto[];
  resolvedAt?: Moment;
  status: string;
}

export interface TaskCommentDto {
  id: string;
  text: string;
  createdAt: Moment;
  createdBy: string;
}

export interface TaskStatusDto {
  status: string;
}