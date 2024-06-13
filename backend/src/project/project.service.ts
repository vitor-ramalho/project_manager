import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}
  create(createProjectDto: CreateProjectDto) {
    try {
      return this.projectRepository.save(createProjectDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  findAll() {
    try {
      return this.projectRepository.find({
        relations: { tasks: true },
        select: { tasks: true },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  findOne(id: number) {
    try {
      return this.projectRepository.findBy({ id });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    try {
      return this.projectRepository.update(id, updateProjectDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  remove(id: number) {
    try {
      return this.projectRepository.delete(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
