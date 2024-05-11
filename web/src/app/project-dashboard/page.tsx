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

export default function ProjectDashboardPage() {
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
            <strong>Nome:</strong> Projeto 1
          </span>
          <span className="text-sm">
            <strong>Tema: </strong> tema do projeto
          </span>
          <span className="text-sm">
            <strong>Descrição:</strong> Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Etiam mi eros, efficitur finibus urna ac, rutrum
            sagittis nisl. Fusce ornare sollicitudin tortor in porta. Nulla sit
            amet nisl euismod, gravida purus id, ultrices nisl.
          </span>
        </div>
        <div className="m-4 p-4 border rounded text-sm">
          <h3 className="mb-1 font-semibold text-base">Orientadores</h3>
          <div className="gap-4">
            <AvatarName name="Rogelio Avery (Orientador)" />
            <AvatarName name="Forrest Maldonado (Co-Orientador)" />
          </div>
        </div>
        <div className="m-4 p-4 border rounded text-sm">
          <h1 className="font-semibold text-base">Status e Datas</h1>
          <Separator className="mb-2" />
          <div>
            <strong className="text-gray-600 font-medium">
              Data de criação:{" "}
            </strong>
            <span>10/09/10</span>
          </div>
          <div>
            <strong className="text-gray-600 font-medium">
              Data de inicio:{" "}
            </strong>
            <span>10/09/10</span>
          </div>
          <div>
            <strong className="text-gray-600 font-medium">Data final: </strong>
            <span>10/12/10</span>
          </div>
          <div className="flex items-center">
            <strong className="text-gray-600 font-medium pr-2">Status: </strong>
            <span>Iniciado</span>
          </div>
        </div>
        <div className="m-4 p-4 border rounded">
          <h3 className="mb-1 font-semibold text-base">Membros do projeto</h3>
          {[
            "Colette Raymond",
            "Wes Miles",
            "Mariana Hurst",
            "Tomas O’Connell",
          ].map((name) => (
            <AvatarName key={name} name={name} />
          ))}
        </div>
      </main>
    </div>
  );
}
