import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

import { FileEntity } from '../files/entities/file.entity';
import { ProjectEntity } from '../project/entities/project.entity';
import { TaskEntity } from '../tasks/entities/task.entity';
import { UserEntity } from '../user/entities/user.entity';

config();

export default class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const userFactory = factoryManager.get(UserEntity);
    const fileFactory = factoryManager.get(FileEntity);
    const projectFactory = factoryManager.get(ProjectEntity);
    const taskFactory = factoryManager.get(TaskEntity);

    const adminUser = await userFactory.make({
      id: 1,
      name: 'Admin',
      email: process.env.ADMIN_EMAIL,
      passwordHash:
        '$2b$12$wB3ldtLK/Zp7558f7genzegcepXklEoYx.XpgeUcHuPEJM46SzprK',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await userFactory.save(adminUser);
    await userFactory.saveMany(10);
    await fileFactory.saveMany(5);
    await projectFactory.saveMany(3);
    await taskFactory.saveMany(15);
  }
}
