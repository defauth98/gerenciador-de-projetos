"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AvatarName from "@/components/AvatarName";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import {
  GetOneProjectResponseType,
  getProjectById,
} from "@/services/project/project";

export default function ProjectDashboardPage() {
  const [project, setProject] = useState<GetOneProjectResponseType>();

  async function getProject() {
    setProject(await getProjectById(1));
  }

  useEffect(() => {
    getProject();
  }, []);

  if (!project) {
    return <div>loading...</div>;
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="flex justify-between w-full">
          <div className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Projeto" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="projeto-1">Projeto 1</SelectItem>
                <SelectItem value="projeto-2">Projeto 2</SelectItem>
                <SelectItem value="projeto-3">Projeto 3</SelectItem>
              </SelectContent>
            </Select>

            <Link
              href="/project-dashboard"
              className="text-foreground transition-colors hover:text-foreground"
            >
              Visão geral
            </Link>
            <Link
              href="/tasks"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Tarefas
            </Link>
            <Link
              href="/files"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Arquivos
            </Link>
          </div>

          <div className="flex items-center gap-1">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="font-sm">Daniel Ribeiro</span>
          </div>
        </nav>
      </header>
      <main className="grid grid-cols-2 grid-flow-row-dense">
        <div className="m-4 p-4 flex flex-col border rounded">
          <h1 className="font-semibold mb-1 text-base">
            Informações do projeto
          </h1>
          <Separator className="mb-2" />
          <span className="text-sm">
            <strong>Nome:</strong> {project.title}
          </span>
          <span className="text-sm">
            <strong>Tema: </strong> {project.theme}
          </span>
          <span className="text-sm">
            <strong>Descrição:</strong> {project.description}
          </span>
        </div>
        <div className="m-4 p-4 border rounded text-sm">
          <h3 className="mb-1 font-bold text-base">Orientadores</h3>
          <div className="gap-4">
            <AvatarName name={project.advisor.name} isAdvisor />
            <AvatarName name={project.coAdvisivor.name} isCoAdvisor />
          </div>
        </div>
        <div className="m-4 p-4 border rounded text-sm">
          <h1 className="font-semibold text-base">Status e Datas</h1>
          <Separator className="mb-2" />
          <div>
            <strong className="font-bold">Data de criação: </strong>
            <span>{String(project.createdAt)}</span>
          </div>
          <div>
            <strong className="font-bold">Data de inicio: </strong>
            <span>{String(project.updatedAt)}</span>
          </div>
          <div>
            <strong className="font-bold">Data final: </strong>
            <span>{String(project.dueDate)}</span>
          </div>
          <div className="flex items-center">
            <strong className="font-bold pr-2">Status: </strong>
            <span>{project.status}</span>
          </div>
        </div>
        <div className="m-4 p-4 border rounded">
          <h3 className="mb-1 font-semibold text-base">Membros do projeto</h3>
          {project.members.map(({ name }) => (
            <AvatarName key={name} name={name} />
          ))}
        </div>
      </main>
    </div>
  );
}
