import React from 'react';
import Ticket from "@/core/Ticket";
import { stringParaEntradaDeData } from "@/utils/converters";

interface TabelaTicketsProps {
  sessaoId: string;
  tickets: Ticket[];
}

function TabelaTickets({ sessaoId, tickets }: TabelaTicketsProps) {
  function renderHeader() {
    return (
      <tr>
        <th className="text-left p-3 bg-gradient-to-r from-red-500 to-red-700 text-white">ID</th>
        <th className="text-left p-3 bg-gradient-to-r from-red-500 to-red-700 text-white">ID Usuário</th>
        <th className="text-left p-3 bg-gradient-to-r from-red-500 to-red-700 text-white">ID Filme</th>
        <th className="text-left p-3 bg-gradient-to-r from-red-500 to-red-700 text-white">Data</th>
      </tr>
    );
  }

  function renderDados() {
    const ticketsDaSessao = tickets.filter(ticket => String(ticket.sessao_id) === sessaoId);

    if (ticketsDaSessao && ticketsDaSessao.length > 0) {
      return ticketsDaSessao.map((ticket, i) => (
        <tr key={ticket.id} className={`${i % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'} text-gray-800`}>
          <td className="text-left p-3">{ticket.id}</td>
          <td className="text-left p-3">{ticket.usuario_id}</td>
          <td className="text-left p-3">{ticket.sessao_id}</td>
          <td className="text-left p-3">{stringParaEntradaDeData(ticket.data)}</td>
        </tr>
      ));
    } else {
      return (
        <tr>
          <td colSpan={4} className="text-center p-3">Nenhum ticket disponível para esta sessão.</td>
        </tr>
      );
    }
  }
  
  return (
    <table className="w-full rounded-xl overflow-hidden bg-gray-100">
      <thead className={`text-gray-800 bg-gradient-to-r from-red-500 to-red-700`}>
        {renderHeader()}
      </thead>
      <tbody>{renderDados()}</tbody>
    </table>
  );
}

export default TabelaTickets;