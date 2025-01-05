import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserEntity } from '../../user/entities/user.entity';

export enum ProjectStatus {
  CREATED = 'criado',
  INITIATED = 'iniciado',
  FINISHED = 'concluido',
}

@Entity('project')
export class ProjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ length: 255 })
  theme: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  advisorId: number;

  @Column()
  coAdvisorId: number;

  @Column()
  dueDate: Date;

  @Column()
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => UserEntity)
  @JoinTable({
    name: 'userProject',
  })
  members: Partial<UserEntity>[];
}
