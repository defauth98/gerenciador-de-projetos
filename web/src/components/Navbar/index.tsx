'use client';

import { Avatar } from '@/components/ui/avatar';
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { PlusIcon } from '@radix-ui/react-icons';
import AvatarName from '@/components/AvatarName';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GetUserProjectsResponseType, getProjectsByUser } from '@/services/project/get-user-projects';
import { GetOneProjectResponseType, getProjectById } from '@/services/project/get-project-by-id';
import { removeAuthInLocalStorage } from '@/utils/removeAuthInLocalStorage';


type User = {
  id: number;
  name: string;
  email: string;
};

interface NavbarProps {
  user: User;
  projects?: GetUserProjectsResponseType['values'];
  onCreateItem: () => void;
  currentPath: 'overview' | 'tasks' | 'files';
  createButtonLabel?: string;
}

export default function Navbar({
  user,
  currentPath,
  onCreateItem,
  createButtonLabel = 'Novo Projeto',
}: NavbarProps) {
  const router = useRouter();
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [projects, setProjects] = useState<GetUserProjectsResponseType['values'] | null>();
  const [currentProject, setCurrentProject] = useState<GetOneProjectResponseType | null>(null);

  const getProjects = useCallback(async () => {
    if (!user) return;

    try {
      const userProjects = await getProjectsByUser(user.id);

      if (!userProjects || (userProjects && userProjects.values.length < 1)) {
        removeAuthInLocalStorage();
        router.push('/login');
        return;
      }

      setProjects(userProjects?.values);

      const initialProjectId = userProjects.values[0].id;
      setSelectedProjectId(String(initialProjectId));

      const project = await getProjectById(initialProjectId);

      if (!project) {
        removeAuthInLocalStorage();
        router.push('/login');
        return;
      }

      setCurrentProject(project);
    } catch (error) {
      console.error('Error fetching projects:', error);
      removeAuthInLocalStorage();
      router.push('/login');
    }
  }, [router, user]);

  const handleSelectProject = async (value: string) => {
    try {
      setSelectedProjectId(value);
      const project = await getProjectById(Number(value));

      if (!project) {
        router.push('/login');
        return;
      }

      setCurrentProject(project);
    } catch (error) {
      console.error('Error selecting project:', error);
      router.push('/login');
    }
  };

  const getNavLinkClass = (path: string) => {
    return `transition-colors hover:text-foreground ${
      currentPath === path ? 'text-foreground' : 'text-muted-foreground'
    }`;
  };

  useEffect(() => {
    getProjects();
  }, [getProjects]);

  if (!projects || !user) {
    return <></>;
  }

  return (
    <header className='sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6'>
      <nav className='flex justify-between w-full items-center'>
        <div className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
          <Select onValueChange={handleSelectProject} value={selectedProjectId}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Projeto'>
                {projects?.find((p) => String(p.id) === selectedProjectId)?.title}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {projects?.map((project) => (
                <SelectItem key={project.id} value={String(project.id)}>
                  {project.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Link
            href='/project-dashboard'
            className={getNavLinkClass('overview')}
          >
            Visão geral
          </Link>

          <Link
            href='/tasks'
            className={getNavLinkClass('tasks')}
          >
            Tarefas
          </Link>

          <Link
            href='/files'
            className={getNavLinkClass('files')}
          >
            Arquivos
          </Link>

          <Button
            onClick={onCreateItem}
            className='flex gap-2 items-center justify-center'
          >
            {createButtonLabel}
            <PlusIcon />
          </Button>
        </div>

        <div className='flex items-center gap-1 h-full'>
          <AvatarName name={user.name} />
        </div>
      </nav>
    </header>
  );
}