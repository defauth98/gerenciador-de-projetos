import { User } from '../../user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class File {
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

  @ManyToOne(() => User)
  @JoinColumn({ name: 'ownerUserId' })
  owner?: User;
}
