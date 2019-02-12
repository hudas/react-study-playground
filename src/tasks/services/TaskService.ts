import axios, {AxiosResponse} from "axios";
import {TaskListDto} from "./dto/TaskListDto";
import {TaskDto, TaskStatusDto} from "./dto/TaskDto";
import {EntityId} from "../../lib/integration/Response";


export function getTask(id: string): Promise<Partial<TaskDto>> {
  return axios.get<TaskDto>(`http://localhost:3000/api/task/${id}`)
    .then((response: AxiosResponse<TaskDto>) => response.data)
}

export function getTaskList(): Promise<TaskListDto[]> {
  return axios.get<TaskListDto[]>("http://localhost:3000/api/task/list")
    .then((response: AxiosResponse<TaskListDto[]>) => response.data);
}

export function updateTaskStatus(id: string, dto: TaskStatusDto): Promise<EntityId> {
  return axios.put<EntityId>(`http://localhost:3000/api/task/${id}/status`, dto)
    .then((response: AxiosResponse<EntityId>) => response.data);
}