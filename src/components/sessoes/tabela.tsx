import React, { useState } from 'react';
import Sessao from "@/core/Sessao"
import { IconeEdicao, IconeLixo } from "../icones/tabela"

interface TabelaProps {
  sessoes: Sessao[]
  sessaoSelecionada?: (sessao: Sessao) => void
  sessaoExcluida?: (sessao: Sessao) => void
}

export default function Tabela(props: TabelaProps) {

  const exibirAcoes = props.sessaoSelecionada || props.sessaoExcluida;

  function renderHeader() {
    return (
      <tr>
        <th className="text-left p-3 bg-gradient-to-r from-red-500 to-red-700 text-white">ID</th>
        <th className="text-left p-3 bg-gradient-to-r from-red-500 to-red-700 text-white">Nome do Filme</th>
        <th className="text-left p-3 bg-gradient-to-r from-red-500 to-red-700 text-white">Data</th>
        <th className="text-left p-3 bg-gradient-to-r from-red-500 to-red-700 text-white">Descrição</th>
        <th className="text-left p-3 bg-gradient-to-r from-red-500 to-red-700 text-white">Status</th>
        {exibirAcoes ? <th className="p-3 bg-gradient-to-r from-red-500 to-red-700 text-white">Ações</th> : false}
      </tr>
    )
  }

  function renderDados() {
    return props.sessoes?.map((sessao, i) => {
      return (
        <tr key={sessao.id}
          className={`${i % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'} text-gray-800`}>
          <td className="text-left p-3">{sessao.id}</td>
          <td className="text-left p-3">{sessao.filmname}</td>
          <td className="text-left p-3">{sessao.data}</td>
          <td className="text-left p-3">{sessao.description}</td>
          <td className="text-left p-3">{sessao.status}</td>
          {exibirAcoes
            ? renderizarAcoes(sessao)
            : false}
        </tr>
      )
    })
  }

  function renderizarAcoes(sessao: Sessao) {
    return (
      <td className="flex justify-center">
        {props.sessaoSelecionada ? (
          <button onClick={() => props.sessaoSelecionada?.(sessao)} className={`flex justify-center items
            text-green-600 rounded-full p-2 m-1
            hover:bg-gray-100`}>{IconeEdicao}</button>
        ) : false}
        {props.sessaoExcluida ? (
          <button onClick={() => props.sessaoExcluida?.(sessao)} className={`flex justify-center items
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