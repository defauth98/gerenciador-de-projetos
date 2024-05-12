import api from "../api";

export type PostLoginResponseType = {
  token: string;
};

export async function postLogin(
  email: string,
  password: string
): Promise<PostLoginResponseType> {
  const response = await api.post("/login", { email, password });

  return response.data as PostLoginResponseType;
}
