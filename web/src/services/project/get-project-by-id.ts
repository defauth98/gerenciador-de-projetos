import api from "../api";

export type GetOneProjectResponseType = {
  id: number;
  title: string;
  theme: string;
  description: string;
  advisorId: number;
  coAdvisorId: number;
  dueDate: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  members: { name: string; email: string }[];
  advisor: {
    name: string;
    email: string;
  };
  coAdvisor: {
    name: string;
    email: string;
  };
};

export async function getProjectById(
  id: number
): Promise<GetOneProjectResponseType | null> {
  try {
    const response = await api.get(`/projects/${id}`);

    return response.data as GetOneProjectResponseType;
  } catch (error) {
    return null;
  }
}
