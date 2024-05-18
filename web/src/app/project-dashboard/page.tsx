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
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  GetOneProjectResponseType,
  getProjectById,
} from "@/services/project/get-project-by-id";
import {
  GetUserProjectsResponseType,
  getProjectsByUser,
} from "@/services/project/get-user-projects";

export default function ProjectDashboardPage() {
  const router = useRouter();

  const [selectProject, setSelectProject] =
    useState<GetOneProjectResponseType | null>();
  const [projects, setProject] = useState<
    GetUserProjectsResponseType["values"] | null
  >();

  const getProject = useCallback(async () => {
    const userProjects = await getProjectsByUser(1);

    if (!userProjects) {
      router.push("/login");
      return;
    }

    setProject(userProjects?.values);

    const project = await getProjectById(userProjects.values[0].id);

    if (!project) {
      router.push("/login");
      return;
    }

    setSelectProject(project);
  }, [router]);

  const handleSelectProject = async (value: string) => {
    const project = await getProjectById(Number(value));

    if (!project) {
      router.push("/login");
      return;
    }

    setSelectProject(project);
  };

  useEffect(() => {
    getProject();
  }, [getProject]);

  if (!selectProject || !projects) {
    return <div>loading...</div>;
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="flex justify-between w-full">
          <div className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Select onValueChange={handleSelectProject}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Projeto" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => {
                  return (
                    <SelectItem key={project.id} value={String(project.id)}>
                      {project.title}
                    </SelectItem>
                  );
                })}
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
            <strong>Nome:</strong> {selectProject.title}
          </span>
          <span className="text-sm">
            <strong>Tema: </strong> {selectProject.theme}
          </span>
          <span className="text-sm">
            <strong>Descrição:</strong> {selectProject.description}
          </span>
        </div>
        <div className="m-4 p-4 border rounded text-sm">
          <h3 className="mb-1 font-bold text-base">Orientadores</h3>
          <div className="gap-4">
            <AvatarName name={selectProject.advisor.name} isAdvisor />
            <AvatarName name={selectProject.coAdvisivor.name} isCoAdvisor />
          </div>
        </div>
        <div className="m-4 p-4 border rounded text-sm">
          <h1 className="font-semibold text-base">Status e Datas</h1>
          <Separator className="mb-2" />
          <div>
            <strong className="font-bold">Data de criação: </strong>
            <span>{String(selectProject.createdAt)}</span>
          </div>
          <div>
            <strong className="font-bold">Data de inicio: </strong>
            <span>{String(selectProject.updatedAt)}</span>
          </div>
          <div>
            <strong className="font-bold">Data final: </strong>
            <span>{String(selectProject.dueDate)}</span>
          </div>
          <div className="flex items-center">
            <strong className="font-bold pr-2">Status: </strong>
            <span>{selectProject.status}</span>
          </div>
        </div>
        <div className="m-4 p-4 border rounded">
          <h3 className="mb-1 font-semibold text-base">Membros do projeto</h3>
          {selectProject.members.map(({ name }) => (
            <AvatarName key={name} name={name} />
          ))}
        </div>
      </main>
    </div>
  );
}
