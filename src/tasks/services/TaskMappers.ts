import {TaskDto, TaskStatusDto} from "./dto/TaskDto";
import {Task} from "../components/view/TaskView";
import moment from "moment";
import {TaskListDto} from "./dto/TaskListDto";
import {TaskRow} from "../components/list/TaskList";
import {TaskStatus} from "../store/task/TaskState";

export function taskDtoToFormState(dto: Partial<TaskDto>): Partial<Task> {
  return {
    ...dto,
    status: dto.status === "RESOLVED" ? TaskStatus.RESOLVED : TaskStatus.OPEN,
    createdAt: moment(dto.createdAt),
    comments: dto.comments && dto.comments.map(comment => ({ ...comment, createdAt: moment(comment.createdAt) }))
  }
}

export function taskListDtoToRow(listDto: Partial<TaskListDto>[]): Partial<TaskRow>[] {
  return listDto.map((dto: Partial<TaskListDto>) => ({
    ...dto,
    createdAt: moment(dto.createdAt)
  }));
}

export function taskStatusToDto(status: string): TaskStatusDto {
  return { status };
}