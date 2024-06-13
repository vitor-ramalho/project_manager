import { Task } from 'src/task/entities/task.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  startDate: Date;

  @OneToMany(() => Task, (task) => task.project, { onDelete: `CASCADE` })
  tasks: Task[];
}
