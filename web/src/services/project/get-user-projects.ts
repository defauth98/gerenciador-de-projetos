import api from "../api";

export type GetUserProjectsResponseType = {
  values: { id: number; title: string }[];
};

export async function getProjectsByUser(
  userId: number
): Promise<GetUserProjectsResponseType | null> {
  try {
    const response = await api.get(`/projects/byUser/${userId}`);

    return response.data as GetUserProjectsResponseType;
  } catch (error) {
    return null;
  }
}
