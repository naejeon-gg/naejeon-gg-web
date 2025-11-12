import { apiClient } from "../libs/axios";

export const authApi = {
  login: async (gameName: string, tagLine: string) => {
    return await apiClient.post("/auth/login", {
      gameName,
      tagLine,
    });
  },
};
