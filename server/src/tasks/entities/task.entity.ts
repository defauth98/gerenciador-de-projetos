import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
