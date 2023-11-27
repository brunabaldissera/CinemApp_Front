'use client'
import React, { useEffect, useState } from "react";
import Layout from "@/components/sessoes/layout";
import Tabela from "@/components/sessoes/tabela";
import Sessao from "@/core/Sessao";
import Ticket from "@/core/Ticket";
import Botao from "@/components/sessoes/botao";
import Formulario from "@/components/sessoes/formulario";
import { atualizarSessao, cadastrarSessao, excluirSessao, fetchSessoes } from "@/service/sessaoService";
import { fetchTicketsSessao } from "@/service/ticketService";
import TabelaTickets from "@/components/sessoes/tabelaTickets";

export default function Sessoes() {
  const [sessao, setSessao] = useState<Sessao>(Sessao.vazio());
  const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela');
  const [sessoes, setSessoes] = useState<Sessao[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedSessionTickets, setSelectedSessionTickets] = useState<string | number | null>(null);

  useEffect(() => {
    if (visivel === 'tabela') {
      const loadSessoes = async () => {
        try {
          const dados = await fetchSessoes();
          setSessoes(dados);
        } catch (error) {
          console.error("Erro ao buscar sessões:", error);
        }
      }
      loadSessoes();
    }
  }, [visivel]);

  useEffect(() => {
    if (selectedSessionTickets !== null) {
      const loadTickets = async () => {
        try {
          const tickets = await fetchTicketsSessao(String(selectedSessionTickets));
          setTickets(tickets);
        } catch (error) {
          console.error(`Erro ao buscar tickets da sessão ${selectedSessionTickets}:`, error);
        }
      };
      loadTickets();
    }
  }, [selectedSessionTickets]);

  function sessaoSelecionada(sessao: Sessao) {
    setSessao(sessao);
    setVisivel('form');
  }

  function novaSessao() {
    setSessao(Sessao.vazio());
    setVisivel("form");
  }

  async function sessaoExcluida(sessao: Sessao) {
    const confirmacao =
      window.confirm("Tem certeza de que deseja excluir esta sessão?");
    if (confirmacao) {
      try {
        if (sessao.id !== null) {
          await excluirSessao(sessao.id);
        } else {
          console.error("sessaoID é null!");
        }
        setSessoes(prevSessoes => prevSessoes.filter(se => se.id !== sessao.id));
      } catch (error) {
        console.error("Erro ao excluir sessão:", error);
      }
    }
  }

  async function salvarSessao(sessao: Sessao) {
    try {
      await cadastrarSessao(sessao);
      setVisivel("tabela");
    } catch (error) {
      console.error("Erro ao salvar sessão:", error);
    }
  }

  async function alterarSessao(sessao: Sessao) {
    try {
      await atualizarSessao(sessao);
      setVisivel("tabela");
    } catch (error) {
      console.error("Erro ao atualizar sessão:", error);
    }
  }

  function salvarOuAlterarSessao(sessao: Sessao) {
    if (sessao.id) {
      alterarSessao(sessao);
    } else {
      salvarSessao(sessao);
    }
  }

  function handleVerTickets(sessaoId: string) {
    setSelectedSessionTickets(sessaoId);
    setVisivel('tabela'); // ou outro estado desejado
  }

  function handleCloseTickets() {
    setSelectedSessionTickets(null);
  }

  return (
    <div className={`
      flex justify-center items-center h-screen
      background: linear-gradient(
        to bottom,
        rgb(var(--background-start-dark-rgb)),
        rgb(var(--background-mid-light-rgb)),
        rgb(var(--background-end-dark-rgb))
      );
    `}>
      <Layout titulo="Cadastro de sessões">
        {visivel === 'tabela' ? (
          <>
            <div className="flex justify-end">
              <Botao className="mb-4" cor="bg-gradient-to-r from-red-500 to-red-700"
                onClick={() => novaSessao()}>
                Nova Sessão
              </Botao>
            </div>
            <Tabela
              sessoes={sessoes}
              sessaoSelecionada={sessaoSelecionada}
              sessaoExcluida={sessaoExcluida}
              verTickets={handleVerTickets}
            />
          </>
        ) : (
          <Formulario
            sessao={sessao}
            sessaoMudou={salvarOuAlterarSessao}
            cancelado={() => setVisivel('tabela')}
          />
        )}
        {selectedSessionTickets && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-md">
            <TabelaTickets sessaoId={String(selectedSessionTickets)} tickets={tickets} />
              <button onClick={handleCloseTickets} className="mt-4 p-2 bg-red-500 text-white rounded-md">Fechar Tickets</button>
            </div>
          </div>
        )}
      </Layout>
    </div>
  );
}