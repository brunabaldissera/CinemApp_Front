import React, { useState } from 'react';
import User from '@/core/User';
import { IconeEdicao, IconeLixo } from "../icones/tabela"

interface TabelaProps {
  users: User[]
  userSelecionado?: (user: User) => void
  userExcluido?: (user: User) => void
}

export default function Tabela(props: TabelaProps) {

  const exibirAcoes = props.userSelecionado || props.userExcluido;

  function renderHeader() {
    return (
      <tr>
        <th className="text-left p-3 bg-gradient-to-r from-red-500 to-red-700 text-white">ID</th>
        <th className="text-left p-3 bg-gradient-to-r from-red-500 to-red-700 text-white">Nome</th>
        <th className="text-left p-3 bg-gradient-to-r from-red-500 to-red-700 text-white">CPF</th>
        <th className="text-left p-3 bg-gradient-to-r from-red-500 to-red-700 text-white">Cidade</th>
        <th className="text-left p-3 bg-gradient-to-r from-red-500 to-red-700 text-white">Telefone</th>
        {exibirAcoes ? <th className="p-3 bg-gradient-to-r from-red-500 to-red-700 text-white">Ações</th> : false}
      </tr>
    )
  }

  function renderDados() {
    return props.users?.map((user, i) => {
      return (
        <tr key={user.id}
          className={`${i % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'} text-gray-800`}>
          <td className="text-left p-3">{user.id}</td>
          <td className="text-left p-3">{user.nome}</td>
          <td className="text-left p-3">{user.cpf}</td>
          <td className="text-left p-3">{user.cidade}</td>
          <td className="text-left p-3">{user.telefone}</td>
          {exibirAcoes
            ? renderizarAcoes(user)
            : false}
        </tr>
      )
    })
  }

  function renderizarAcoes(user: User) {
    return (
      <td className="flex justify-center">
        {props.userSelecionado ? (
          <button onClick={() => props.userSelecionado?.(user)} className={`flex justify-center items
            text-green-600 rounded-full p-2 m-1
            hover:bg-gray-100`}>{IconeEdicao}</button>
        ) : false}
        {props.userExcluido ? (
          <button onClick={() => props.userExcluido?.(user)} className={`flex justify-center items
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