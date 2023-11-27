import axios from "axios";
import User from "@/core/User";

interface ApiResponse {
  content: User[];
}

const BASE_URL = "http://localhost:8080";

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(`${BASE_URL}/usuarios`);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao buscar usuários");
  }
};

export const cadastrarUser = async (user: User): Promise<User> => {
  try {
    const response = await axios.post<User>(`${BASE_URL}/usuarios`, user);
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    throw error;
  }
};

export const atualizarUser = async (user: User): Promise<User> => {
  try {
    const response = await axios.put<User>(
      `${BASE_URL}/usuarios/${user.id}`,
      user
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    throw error;
  }
};

export const excluirUser = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/usuarios/${id}`);
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    throw error;
  }
};