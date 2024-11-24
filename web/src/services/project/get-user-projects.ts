import { removeAuthInLocalStorage } from "@/utils/removeAuthInLocalStorage";
import api from "../api";

export type GetUserProjectsResponseType = {
  values: { id: number; title: string }[];
};

export async function getProjectsByUser(
  userId: number
): Promise<GetUserProjectsResponseType | null> {
  try {
    const response = await api.get(`/projects/byUser/${userId}`);

    if (response.status === 401) {
      removeAuthInLocalStorage();
    }

    return response.data as GetUserProjectsResponseType;
  } catch (error) {
    return null;
  }
}
