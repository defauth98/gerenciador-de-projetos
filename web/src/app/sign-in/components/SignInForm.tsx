import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignInForm() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="flex flex-col w-[350px] pb-4">
        <h1 className="text-xl font-semibold">Cadastro</h1>
        <p className="text-sm">Bem-vindo(a) a nossa plataforma </p>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 w-[350px]">
        <Input type="text" placeholder="Nome" className="w-full" />
        <Input type="email" placeholder="Email" className="w-full" />
        <Input type="password" placeholder="Senha" className="w-full" />
        <Input
          type="password"
          placeholder="Confirmar senha"
          className="w-full"
        />
        <Button variant="default" className="w-[250px]">
          Cadastrar
        </Button>
      </div>
    </div>
  );
}
