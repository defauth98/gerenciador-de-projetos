import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ProjectStatus {
  CREATED = 'criado',
  INITIATED = 'iniciado',
  FINISHED = 'concluido',
}

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ length: 255 })
  theme: string;

  @Column({ length: 255 })
  description: string;

  @Column()
  advisivorId: number;

  @Column()
  coAdvisivorId: number;

  @Column()
  dueDate: Date;

  @Column()
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => User)
  @JoinTable()
  members: User[];
}
