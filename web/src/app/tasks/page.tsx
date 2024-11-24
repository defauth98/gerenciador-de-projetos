'use client';

import Link from 'next/link';
import { useCallback, useState } from 'react';
import Modal from '@/components/Dialog';
import { Button } from '@/components/ui/button';
import { CrossCircledIcon, Pencil2Icon, PlusIcon } from '@radix-ui/react-icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import AvatarName from '@/components/AvatarName';

import { Checkbox } from '@/components/ui/checkbox';
import Navbar from '@/components/Navbar';

type OpenModal = {
  isOpen: boolean;
  type: 'edit' | 'create';
};

type Task = {
  id: number;
  name: string;
  checked: boolean;
  dueDate: Date;
  priority: string;
  ownerUserId: number;
  responsibleUserId: number;
};

const openModalDefaultValues: OpenModal = {
  isOpen: false,
  type: 'edit',
};

const tasks: Task[] = [
  {
    id: 1,
    name: 'ESCREVER ARTIGO',
    checked: false,
    priority: 'medium',
    dueDate: new Date(),
    ownerUserId: 1,
    responsibleUserId: 2,
  },
  {
    id: 2,
    name: 'ESCREVER ARTIGO',
    checked: false,
    priority: 'medium',
    dueDate: new Date(),
    ownerUserId: 1,
    responsibleUserId: 2,
  },
];

type User = {
  id: number;
  name: string;
  email: string;
};


export default function TasksPage() {
  const [isOpenModal, setIsOpenModal] = useState(openModalDefaultValues);
  const [selectedTask, setSelectedTask] = useState<Task | null>();

  const [user, setUser] = useState<User>({
    id: 1,
    email: 'neto.dani@mail.com',
    name: 'Daniel Ribeiro Neto',
  });
  
  const handleCloseModal = () =>
    setIsOpenModal((prev) => ({ ...prev, isOpen: false }));

  const handleOpenEditTaskModal = (task: Task) => {
    setSelectedTask(task);
    setIsOpenModal({ isOpen: true, type: 'edit' });
  };

  const handleOpenCreateTaskModal = () =>
    setIsOpenModal({ isOpen: true, type: 'create' });

  const renderModalContent = useCallback(() => {
    switch (isOpenModal.type) {
      case 'edit':
        return (
          <form className='flex flex-col gap-4'>
            <div className='flex flex-col gap-4 p-4 border rounded'>
              <h3 className='mb-1 font-semibold text-base'>
                Informações da Tarefa
              </h3>

              <fieldset className='flex flex-col gap-2'>
                <label>Nome</label>
                <Input placeholder='Título' value={selectedTask?.name} />
              </fieldset>

              <fieldset className='flex flex-col gap-2'>
                <label>Status</label>
                <div className='px-2 flex items-center gap-2'>
                  <Checkbox checked={selectedTask?.checked} />
                  <label htmlFor='' className='opacity-50 font-normal'>
                    Finalizado
                  </label>
                </div>
              </fieldset>

              <fieldset className='flex flex-col gap-2'>
                <label>Prioridade</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder='Prioridade' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='high'>Alta</SelectItem>
                    <SelectItem value='medium'>Média</SelectItem>
                    <SelectItem value='low'>Baixa</SelectItem>
                  </SelectContent>
                </Select>
              </fieldset>
            </div>
            <div className='p-4 border rounded'>
              <h3 className='mb-1 font-semibold text-base'>Responsável</h3>

              <div className='my-4'></div>
            </div>
            <div className='p-4 border rounded'>
              <h3 className='mb-1 font-semibold text-base'>Relator</h3>

              <div className='my-4'></div>
            </div>
          </form>
        );
      case 'create':
        return (
          <form className='flex flex-col gap-4'>
            <div className='flex flex-col gap-4 p-4 border rounded'>
              <h3 className='mb-1 font-semibold text-base'>
                Informações da Tarefa
              </h3>

              <fieldset className='flex flex-col gap-2'>
                <label>Nome</label>
                <Input placeholder='Título' />
              </fieldset>

              <fieldset className='flex flex-col gap-2'>
                <label>Status</label>
                <div className='px-2 flex items-center gap-2'>
                  <Checkbox />
                  <label htmlFor='' className='opacity-50 font-normal'>
                    Finalizado
                  </label>
                </div>
              </fieldset>

              <fieldset className='flex flex-col gap-2'>
                <label>Prioridade</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder='Prioridade' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='high'>Alta</SelectItem>
                    <SelectItem value='medium'>Média</SelectItem>
                    <SelectItem value='low'>Baixa</SelectItem>
                  </SelectContent>
                </Select>
              </fieldset>
            </div>
            <div className='p-4 border rounded'>
              <h3 className='mb-1 font-semibold text-base'>Responsável</h3>

              <div className='my-4'></div>
            </div>
            <div className='p-4 border rounded'>
              <h3 className='mb-1 font-semibold text-base'>Relator</h3>

              <div className='my-4'></div>
            </div>
          </form>
        );
      default:
        return <></>;
    }
  }, [isOpenModal]);

  return (
    <div className='flex min-h-screen w-full flex-col'>
      <Navbar
        user={user}
        currentPath="tasks"
        onCreateItem={handleOpenCreateTaskModal}
        createButtonLabel="Nova Tarefa"
      />

      <main className='p-4'>
        <Table className='border'>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Prioridade</TableHead>
              <TableHead>Data de Entrega</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.name}>
                <TableCell>
                  <Checkbox checked={task.checked} />
                </TableCell>
                <TableCell>{task.name}</TableCell>
                <TableCell>{task.priority}</TableCell>
                <TableCell>{task.dueDate.toDateString()}</TableCell>

                <TableCell>
                  <button onClick={() => handleOpenEditTaskModal(task)}>
                    <Pencil2Icon className='size-4' />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>

      <Modal
        open={isOpenModal.isOpen}
        handleSubmitModal={() => {}}
        content={renderModalContent()}
        handleCloseModal={handleCloseModal}
        title={`${isOpenModal.type === 'edit' ? 'Editar' : 'Criar'} Tarefa`}
      />
    </div>
  );
}
