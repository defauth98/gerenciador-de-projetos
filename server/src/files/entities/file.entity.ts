import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'ownerUserId' })
  owner?: UserEntity;
}
