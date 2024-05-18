import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/services/api";
import { postSignIn } from "@/services/auth/signin";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

type Inputs = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();

  async function handleSignInSubmit(data: Inputs) {
    const { name, email, password, passwordConfirmation } = data;

    const { token, user } = await postSignIn({
      name,
      email,
      password,
      passwordConfirmation,
    });

    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      localStorage.setItem("@RNauth:token", JSON.stringify(token));
      localStorage.setItem("@RNauth:user", JSON.stringify(user));
      router.push("/project-dashboard");
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="flex flex-col w-[350px] pb-4">
        <h1 className="text-xl font-semibold">Cadastro</h1>
        <p className="text-sm">Bem-vindo(a) a nossa plataforma </p>
      </div>
      <form
        className="flex flex-col items-center justify-center gap-4 w-[350px]"
        onSubmit={handleSubmit(handleSignInSubmit)}
      >
        <Input
          type="text"
          placeholder="Nome"
          className="w-full"
          {...register("name")}
        />
        <Input
          type="email"
          placeholder="Email"
          className="w-full"
          {...register("email")}
        />
        <Input
          type="password"
          placeholder="Senha"
          className="w-full"
          {...register("password")}
        />
        <Input
          type="password"
          placeholder="Confirmar senha"
          className="w-full"
          {...register("passwordConfirmation")}
        />
        <Button variant="default" className="w-[250px]">
          Cadastrar
        </Button>
      </form>
    </div>
  );
}
