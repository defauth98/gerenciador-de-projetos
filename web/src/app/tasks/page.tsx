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

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Download, Delete } from "lucide-react";

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
              href="#"
              className="text-foreground transition-colors hover:text-foreground"
            >
              Dashboard
            </Link>
            <Link
              href="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Tarefas
            </Link>
            <Link
              href="#"
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
      <main className="p-4">
        <Table className="border">
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Data do upload</TableHead>
              <TableHead>Usuário</TableHead>
              <TableHead>Açoes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              {
                name: "Relatório final versão 1",
                type: "docx",
                uploadedAt: new Date(),
                uploadedBy: "Daniel Ribeiro",
              },
              {
                name: "Relatório final versão 2",
                type: "docx",
                uploadedAt: new Date(),
                uploadedBy: "Daniel Ribeiro",
              },
            ].map((file) => (
              <TableRow key={file.name}>
                <TableCell>{file.name}</TableCell>
                <TableCell>{file.type}</TableCell>
                <TableCell>{file.uploadedAt.toISOString()}</TableCell>
                <TableCell>{file.uploadedBy}</TableCell>
                <TableCell className="flex gap-1">
                  <Download />
                  <Delete />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
  );
}
