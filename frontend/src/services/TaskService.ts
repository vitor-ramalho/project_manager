import { ITask } from "./ProjectService";
import api from "./api";

export async function createTask(task: ITask): Promise<ITask> {
  console.log(task, "task");
  const response = await api.post("/task", task);
  return response.data;
}

export async function resolveTask(id: number): Promise<ITask> {
  const response = await api.patch(`/task/${id}/resolve`);
  return response.data;
}