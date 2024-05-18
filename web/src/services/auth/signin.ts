import api from "../api";

export type PostSignInType = {
  token: string;
  user: {
    email: string;
    name: string;
    id: number;
  };
};

export async function postSignIn({
  name,
  email,
  password,
  passwordConfirmation,
}: {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}): Promise<PostSignInType> {
  const response = await api.post("/users", {
    name,
    email,
    password,
    passwordConfirmation,
  });

  return response.data as PostSignInType;
}
