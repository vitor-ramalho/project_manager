import { Project } from 'src/project/entities/project.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    nullable: true,
  })
  completionDate: Date;

  @Column({
    default: false,
  })
  isCompleted: boolean;

  @ManyToOne(() => Project, (project) => project.tasks)
  @JoinColumn({ name: 'projectId', referencedColumnName: 'id' })
  project: Project;
}
