import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginForm() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="flex flex-col w-[350px] pb-4">
        <h1 className="text-xl font-semibold">Acessar</h1>
        <p className="text-sm">Bem-vindo(a) de volta!</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 w-[350px]">
        <Input type="email" placeholder="Email" className="w-full" />
        <Input type="password" placeholder="Password" className="w-full" />
        <Button variant="default" className="w-[250px]">
          Fazer login
        </Button>
      </div>
      <div className="pt-4">
        <p className="text-sm">
          Ainda não possui uma conta?
          <span className="underline">Cadastre-se</span>
        </p>
      </div>
    </div>
  );
}
