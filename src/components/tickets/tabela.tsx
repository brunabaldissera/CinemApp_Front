import React, { useState } from 'react';
import { IconeEdicao, IconeLixo } from "../icones/tabela"
import Ticket from '@/core/Ticket';
import { stringParaEntradaDeData } from '@/utils/converters';

interface TabelaProps {
  tickets: Ticket[]
  ticketSelecionado?: (ticket: Ticket) => void
  ticketExcluido?: (ticket: Ticket) => void
}

export default function Tabela(props: TabelaProps) {

  const exibirAcoes = props.ticketSelecionado || props.ticketExcluido;

  function renderHeader() {
    return (
      <tr>
        <th className="text-left p-3 bg-gradient-to-r from-red-500 to-red-700 text-white">ID</th>
        <th className="text-left p-3 bg-gradient-to-r from-red-500 to-red-700 text-white">ID Sessão</th>
        <th className="text-left p-3 bg-gradient-to-r from-red-500 to-red-700 text-white">ID Usuário</th>
        <th className="text-left p-3 bg-gradient-to-r from-red-500 to-red-700 text-white">Data</th>
        {exibirAcoes ? <th className="p-3 bg-gradient-to-r from-red-500 to-red-700 text-white">Ações</th> : false}
      </tr>
    )
  }

  function renderDados() {
    return props.tickets?.map((ticket, i) => {
      return (
        <tr key={ticket.id}
          className={`${i % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'} text-gray-800`}>
          <td className="text-left p-3">{ticket.id}</td>
          <td className="text-left p-3">{ticket.sessao_id}</td>
          <td className="text-left p-3">{ticket.usuario_id}</td>
          <td className="text-left p-3">{stringParaEntradaDeData(ticket.data)}</td>
          {exibirAcoes
            ? renderizarAcoes(ticket)
            : false}
        </tr>
      )
    })
  }

  function renderizarAcoes(ticket: Ticket) {
    return (
      <td className="flex justify-center">
        {props.ticketSelecionado ? (
          <button onClick={() => props.ticketSelecionado?.(ticket)} className={`flex justify-center items
            text-green-600 rounded-full p-2 m-1
            hover:bg-gray-100`}>{IconeEdicao}</button>
        ) : false}
        {props.ticketExcluido ? (
          <button onClick={() => props.ticketExcluido?.(ticket)} className={`flex justify-center items
            text-red-600 rounded-full p-2 m-1
            hover:bg-gray-100`}>{IconeLixo}</button>
        ) : false}
      </td>
    )
  }

  return (
    <table className="w-full rounded-xl overflow-hidden bg-gray-100">
      <thead className={`text-gray-800
        bg-gradient-to-r from-red-500 to-red-700`}>
        {renderHeader()}
      </thead>
      <tbody>
        {renderDados()}
      </tbody>
    </table>
  )
}