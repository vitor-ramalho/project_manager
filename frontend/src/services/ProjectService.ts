import api from "./api"

export interface ITask { 
  id?: number;
  title: string;
  description: string;
  completionDate?: Date;
  isCompleted?: boolean;
  projectId?: number;
}

export interface IProject {
  id?: number,
  name: string, 
  description: string,
  startDate: Date,
  tasks?: ITask[]
}

export async function getProjects(): Promise<IProject[]> {
  const response = await api.get('/project');
  return response.data;
}

export async function createProject(project: IProject): Promise<IProject> {
  const response = await api.post('/project', project);
  return response.data;
}

export async function editProject(project: IProject): Promise<IProject> {
  const response = await api.patch(`/project/${project.id}`, project);
  return response.data;
}

export async function deleteProject(id: number): Promise<void> {
  await api.delete(`/project/${id}`);
}