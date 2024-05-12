"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { postLogin } from "@/services/auth/login";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();

  async function handleLoginSubmit(data: Inputs) {
    const { email, password } = data;

    const { token } = await postLogin(email, password);

    if (token) {
      router.push("/project-dashboard");
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="flex flex-col w-[350px] pb-4">
        <h1 className="text-xl font-semibold">Acessar</h1>
        <p className="text-sm">Bem-vindo(a) de volta!</p>
      </div>
      <form
        className="flex flex-col items-center justify-center gap-4 w-[350px]"
        onSubmit={handleSubmit(handleLoginSubmit)}
      >
        <Input
          type="email"
          placeholder="Email"
          className="w-full"
          {...register("email")}
        />
        <Input
          type="password"
          placeholder="Password"
          className="w-full"
          {...register("password")}
        />
        <Button variant="default" className="w-[250px]">
          Fazer login
        </Button>
      </form>
      <div className="pt-4">
        <p className="text-sm">
          Ainda não possui uma conta? <Link href="/sign-in">Cadastrar</Link>
        </p>
      </div>
    </div>
  );
}
