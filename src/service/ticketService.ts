import axios from "axios";
import Ticket from "@/core/Ticket";

interface ApiResponse {
  content: Ticket[];
}

const BASE_URL = "http://localhost:8080";

export const fetchTicketsSessao = async (sessaoId: string): Promise<Ticket[]> => {
  try {
    const response = await axios.get<Ticket[]>(`${BASE_URL}/ticket?sessaoId=${sessaoId}`);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao buscar tickets");
  }
};

export const fetchTickets = async (): Promise<Ticket[]> => {
  try {
    const response = await axios.get<Ticket[]>(`${BASE_URL}/ticket`);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao buscar tickets");
  }
};

export const cadastrarTicket = async (ticket: Ticket): Promise<Ticket> => {
  try {
    const response = await axios.post<Ticket>(`${BASE_URL}/ticket`, ticket);
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar ticket:", error);
    throw error;
  }
};

export const atualizarTicket = async (ticket: Ticket): Promise<Ticket> => {
  try {
    const response = await axios.put<Ticket>(
      `${BASE_URL}/ticket/${ticket.id}`,
      ticket
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar ticket:", error);
    throw error;
  }
};

export const excluirTicket = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/ticket/${id}`);
  } catch (error) {
    console.error("Erro ao excluir ticket:", error);
    throw error;
  }
};