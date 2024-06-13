import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    try {
      const projectId = createTaskDto.projectId;
      return await this.taskRepository.save({
        description: createTaskDto.description,
        title: createTaskDto.title,
        project: { id: projectId },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async resolveTask(id: number) {
    try {
      const task = await this.taskRepository.findOneBy({ id });
      task.isCompleted = true;
      task.completionDate = new Date();
      return await this.taskRepository.save(task);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  findAll() {
    try {
      return this.taskRepository.find();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  findOne(id: number) {
    try {
      return this.taskRepository.findBy({ id });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    try {
      return this.taskRepository.update(id, updateTaskDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  remove(id: number) {
    try {
      return this.taskRepository.delete(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
