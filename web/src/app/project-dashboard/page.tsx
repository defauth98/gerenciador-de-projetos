'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import AvatarName from '@/components/AvatarName';
import { Separator } from '@/components/ui/separator';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  GetOneProjectResponseType,
  getProjectById,
} from '@/services/project/get-project-by-id';
import {
  GetUserProjectsResponseType,
  getProjectsByUser,
} from '@/services/project/get-user-projects';
import api from '@/services/api';
import { removeAuthInLocalStorage } from '@/utils/removeAuthInLocalStorage';
import {
  Cross1Icon,
  CrossCircledIcon,
  Pencil2Icon,
  PlusIcon,
} from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import Modal from '@/components/Dialog';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/Navbar';

type User = {
  id: number;
  name: string;
  email: string;
};

type OpenModal = {
  isOpen: boolean;
  type: 'edit' | 'create';
};

const openModalDefaultValues: OpenModal = {
  isOpen: false,
  type: 'edit',
};

export default function ProjectDashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>({
    id: 1,
    email: 'neto.dani@mail.com',
    name: 'Daniel Ribeiro Neto',
  });

  const [isOpenModal, setIsOpenModal] = useState(openModalDefaultValues);

  const [selectProject, setSelectProject] =
    useState<GetOneProjectResponseType | null>();
  const [projects, setProject] = useState<
    GetUserProjectsResponseType['values'] | null
  >();

  const getProject = useCallback(async () => {
    if (!user) return;

    const userProjects = await getProjectsByUser(user.id);

    if (!userProjects || (userProjects && userProjects.values.length < 1)) {
      removeAuthInLocalStorage();

      router.push('/login');
      return;
    }

    setProject(userProjects?.values);

    const project = await getProjectById(userProjects.values[0].id);

    if (!project) {
      removeAuthInLocalStorage();
      router.push('/login');
      return;
    }

    setSelectProject(project);
  }, [router, user]);

  const handleSelectProject = async (value: string) => {
    const project = await getProjectById(Number(value));

    if (!project) {
      router.push('/login');
      return;
    }

    setSelectProject(project);
  };

  const handleCloseModal = () =>
    setIsOpenModal((prev) => ({ ...prev, isOpen: false }));

  const handleOpenEditProjectModal = () =>
    setIsOpenModal({ isOpen: true, type: 'edit' });

  const handleOpenCreateProjectModal = () =>
    setIsOpenModal({ isOpen: true, type: 'create' });

  const renderModalContent = useCallback(() => {
    switch (isOpenModal.type) {
      case 'edit':
        return (
          <form className='flex flex-col gap-4'>
            <div className='flex flex-col gap-4 p-4 border rounded'>
              <h3 className='mb-1 font-semibold text-base'>
                Informações do Projeto
              </h3>

              <fieldset className='flex flex-col gap-2'>
                <label>Nome</label>
                <Input placeholder='Nome' value={selectProject?.title} />
              </fieldset>

              <fieldset className='flex flex-col gap-2'>
                <label>Tema</label>
                <Input placeholder='Tema' value={selectProject?.theme} />
              </fieldset>

              <fieldset className='flex flex-col gap-2'>
                <label>Descrição</label>
                <Input placeholder='Descrição' value={selectProject?.title} />
              </fieldset>
            </div>

            <div className='max-h-[200px] p-4 border rounded overflow-y-auto'>
              <h3 className='mb-4 font-semibold text-base'>
                Membros do projeto
              </h3>

              {selectProject?.members.map(({ name }) => (
                <div className='flex items-center gap-2'>
                  <AvatarName key={name} name={name} />

                  {selectProject.members.length === 1 ? (
                    <></>
                  ) : (
                    <button>
                      <CrossCircledIcon className='cursor mb-2 text-red-600 size-4' />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </form>
        );
      case 'create':
        return (
          <form className='flex flex-col gap-4'>
            <div className='flex flex-col gap-4 p-4 border rounded'>
              <h3 className='mb-1 font-semibold text-base'>
                Informações do Projeto
              </h3>

              <fieldset className='flex flex-col gap-2'>
                <label>Nome</label>
                <Input placeholder='Nome' value={''} />
              </fieldset>

              <fieldset className='flex flex-col gap-2'>
                <label>Tema</label>
                <Input placeholder='Tema' value={''} />
              </fieldset>

              <fieldset className='flex flex-col gap-2'>
                <label>Descrição</label>
                <Input placeholder='Descrição' value={''} />
              </fieldset>
            </div>

            <div className='p-4 border rounded'>
              <h3 className='mb-1 font-semibold text-base'>
                Membros do projeto
              </h3>

              <div className='my-4'></div>
            </div>
          </form>
        );
      default:
        return <></>;
    }
  }, [isOpenModal, selectProject]);

  useEffect(() => {
    if (user) getProject();
  }, [getProject, user]);

  if (!selectProject || !projects || !user) return <></>;

  return (
    <div className='relative flex min-h-screen w-full flex-col'>
       <Navbar
        user={user}
        currentPath="overview"
        onCreateItem={handleOpenCreateProjectModal}
        createButtonLabel="Novo Projeto"
      />

      <main className='grid grid-cols-2 grid-flow-row-dense'>
        <div className='m-4 p-4 flex flex-col border rounded'>
          <h1 className='font-semibold mb-1 text-base'>
            Informações do projeto
          </h1>
          <Separator className='mb-2' />
          <span className='text-sm'>
            <strong>Nome:</strong> {selectProject.title}
          </span>
          <span className='text-sm'>
            <strong>Tema: </strong> {selectProject.theme}
          </span>
          <span className='text-sm'>
            <strong>Descrição:</strong> {selectProject.description}
          </span>
        </div>
        <div className='m-4 p-4 border rounded text-sm'>
          <h3 className='mb-1 font-bold text-base'>Orientadores</h3>
          <div className='gap-4'>
            {selectProject.advisor && (
              <AvatarName name={selectProject.advisor.name} isAdvisor />
            )}
            {selectProject.coAdvisor && (
              <AvatarName name={selectProject.coAdvisor.name} isCoAdvisor />
            )}
          </div>
        </div>
        <div className='m-4 p-4 border rounded text-sm'>
          <h1 className='font-semibold text-base'>Status e Datas</h1>
          <Separator className='mb-2' />
          <div>
            <strong className='font-bold'>Data de criação: </strong>
            <span>{String(selectProject.createdAt)}</span>
          </div>
          <div>
            <strong className='font-bold'>Data de inicio: </strong>
            <span>{String(selectProject.updatedAt)}</span>
          </div>
          <div>
            <strong className='font-bold'>Data final: </strong>
            <span>{String(selectProject.dueDate)}</span>
          </div>
          <div className='flex items-center'>
            <strong className='font-bold pr-2'>Status: </strong>
            <span>{selectProject.status}</span>
          </div>
        </div>
        <div className='m-4 p-4 border rounded'>
          <h3 className='mb-1 font-semibold text-base'>Membros do projeto</h3>
          {selectProject.members.map(({ name }) => (
            <AvatarName key={name} name={name} />
          ))}
        </div>
      </main>

      <footer className='absolute bottom-8 right-8'>
        <Button
          onClick={handleOpenEditProjectModal}
          className='flex gap-2 items-center justify-center'
        >
          Editar
          <Pencil2Icon />
        </Button>
      </footer>

      <Modal
        open={isOpenModal.isOpen}
        handleSubmitModal={() => {}}
        content={renderModalContent()}
        handleCloseModal={handleCloseModal}
        title={`${isOpenModal.type === 'edit' ? 'Editar' : 'Criar'} Projeto`}
      />
    </div>
  );
}
