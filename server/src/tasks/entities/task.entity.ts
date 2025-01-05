import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ProjectEntity } from '../../project/entities/project.entity';

@Entity('task')
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column()
  checked: boolean;

  @Column()
  priority: string;

  @Column()
  dueDate: Date;

  @Column({ nullable: true })
  ownerUserId: number;

  @Column({ nullable: true })
  responsibleUserId: number;

  @Column({ default: null, nullable: true })
  projectId: number | null;

  @OneToMany(() => ProjectEntity, (project) => project.id)
  @JoinColumn({ name: 'projectId' })
  project?: ProjectEntity;
}
