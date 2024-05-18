import { Inject, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @Inject('PROJECT_REPOSITORY')
    private projectRepository: Repository<Project>,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    await this.projectRepository.insert(createProjectDto);
  }

  findAll() {
    return this.projectRepository.find();
  }

  async findOne(id: number) {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: {
        members: true,
      },
    });

    const advisor = await this.userRepository.findOne({
      select: {
        name: true,
        email: true,
      },
      where: { id: project.advisivorId },
    });

    const coAdvisivor = await this.userRepository.findOne({
      select: {
        name: true,
        email: true,
      },
      where: { id: project.coAdvisivorId },
    });

    project.members = project.members.map((member) => ({
      name: member.name,
      email: member.email,
    })) as any;

    return {
      ...project,
      advisor,
      coAdvisivor,
    };
  }

  async findProjectsByUserId(userId: number) {
    const projects = await this.projectRepository.find({
      where: {
        members: {
          id: userId,
        },
      },
    });

    return (
      {
        values: projects.map((project) => ({
          id: project.id,
          title: project.title,
        })),
      } ?? null
    );
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return this.projectRepository.update({ id }, updateProjectDto);
  }

  remove(id: number) {
    return this.projectRepository.delete({ id });
  }
}
