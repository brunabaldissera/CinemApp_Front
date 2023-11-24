import axios from "axios";
import Sessao from "@/core/Sessao";

interface ApiResponse {
  content: Sessao[];
}

const BASE_URL = "http://localhost:8080";

export const fetchSessoes = async (): Promise<Sessao[]> => {
  try {
    const response = await axios.get<ApiResponse>(`${BASE_URL}/sessions`);
    return response.data.content;
  } catch (error) {
    throw new Error("Erro ao buscar sessões");
  }
};

export const cadastrarSessao = async (sessao: Sessao): Promise<Sessao> => {
  try {
    const response = await axios.post<Sessao>(`${BASE_URL}/sessions`, sessao);
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar sessão:", error);
    throw error;
  }
};

export const atualizarSessao = async (sessao: Sessao): Promise<Sessao> => {
  try {
    const response = await axios.put<Sessao>(
      `${BASE_URL}/sessions/${sessao.id}`,
      sessao
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar sessão:", error);
    throw error;
  }
};

export const excluirSessao = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/sessions/${id}`);
  } catch (error) {
    console.error("Erro ao excluir sessão:", error);
    throw error;
  }
};