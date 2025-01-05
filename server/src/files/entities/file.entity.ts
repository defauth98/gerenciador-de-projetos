import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ProjectEntity } from '../../project/entities/project.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('file')
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  fileType: string;

  @Column()
  uploadedAt: Date;

  @Column()
  ownerUserId?: number;

  @Column({ length: 255 })
  filePath: string;

  @Column({ default: null, nullable: true })
  projectId: number | null;

  @OneToMany(() => ProjectEntity, (project) => project.id)
  @JoinColumn({ name: 'projectId' })
  project?: ProjectEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'ownerUserId' })
  owner?: UserEntity;
}
