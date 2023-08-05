import { api } from "../../apiConfig/Config";

export const GetAllGuriyaha = async () => {
  return await api.get("/guriyaha");
}

export const AddGuriyaha = async (data) => {
  return await api.post("/guriyaha", data);
}

export const DeleteGuriyaha = async (id) => {
  return await api.delete(`/guriyaha/${id}`);
}

export const UpdateGuriyaha = async (id, data) => {
  return await api.put(`/guriyaha/${id}`, data);
}
