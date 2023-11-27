'use client'
import Ticket from "@/core/Ticket";
import { atualizarTicket, cadastrarTicket, excluirTicket, fetchTickets } from "@/service/ticketService";
import React, { useEffect, useState } from "react";
import Layout from "@/components/tickets/layout";
import Botao from "@/components/tickets/botao";
import Tabela from "@/components/tickets/tabela";
import Formulario from "@/components/tickets/formulario";

export default function Tickets() {
  const [ticket, setTicket] = useState<Ticket>(Ticket.vazio());
  const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela');
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    if (visivel === 'tabela') {
      const loadTickets = async () => {
        try {
          const dados = await fetchTickets();
          setTickets(dados);
        } catch (error) {
          console.error("Erro ao buscar tickets:", error);
        }
      }
      loadTickets();
    }
  }, [visivel]);

  function ticketSelecionado(ticket: Ticket) {
    setTicket(ticket);
    setVisivel('form');
  }

  function novoTicket() {
    setTicket(Ticket.vazio());
    setVisivel("form");
  }

  async function ticketExcluido(ticket: Ticket) {
    const confirmacao =
      window.confirm("Tem certeza de que deseja excluir este ticket?");
    if (confirmacao) {
      try {
        if (ticket.id !== null) {
          await excluirTicket(ticket.id);
        } else {
          console.error("ticketID é null!");
        }
        setTickets(prevTickets => prevTickets.filter(ti => ti.id !== ticket.id));
      } catch (error) {
        console.error("Erro ao excluir ticket:", error);
      }
    }
  }

  async function salvarTicket(ticket: Ticket) {
    try {
      await cadastrarTicket(ticket);
      setVisivel("tabela");
    } catch (error) {
      console.error("Erro ao salvar ticket:", error);
    }
  }

  async function alterarTicket(ticket: Ticket) {
    try {
      await atualizarTicket(ticket);
      setVisivel("tabela");
    } catch (error) {
      console.error("Erro ao atualizar ticket:", error);
    }
  }

  function salvarOuAlterarTicket(ticket: Ticket) {
    if (ticket.id) {
      alterarTicket(ticket);
    } else {
      salvarTicket(ticket);
    }
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
      <Layout titulo="Cadastro de tickets">
        {visivel === 'tabela' ? (
          <>
            <div className="flex justify-end">
              <Botao className="mb-4" cor="bg-gradient-to-r from-red-500 to-red-700"
                onClick={() => novoTicket()}>
                Novo Ticket
              </Botao>
            </div>
            <Tabela
              tickets={tickets}
              ticketSelecionado={ticketSelecionado}
              ticketExcluido={ticketExcluido}
            />
          </>
        ) : (
          <Formulario
            ticket={ticket}
            ticketMudou={salvarOuAlterarTicket}
            cancelado={() => setVisivel('tabela')}
          />
        )}
      </Layout>
    </div>
  );
}
