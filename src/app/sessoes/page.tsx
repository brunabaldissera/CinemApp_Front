'use client'
import React, { useEffect, useState } from "react";
import Layout from "@/components/sessoes/layout";
import Tabela from "@/components/sessoes/tabela";
import Sessao from "@/core/Sessao";
import Botao from "@/components/sessoes/botao";
import Formulario from "@/components/sessoes/formulario";
import { atualizarSessao, cadastrarSessao, excluirSessao, fetchSessoes } from "@/service/sessaoService";

export default function Sessoes() {
  const [sessao, setSessao] = useState<Sessao>(Sessao.vazio())
  const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela')
  const [sessoes, setSessoes] = useState<Sessao[]>([]);

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

  function sessaoSelecionada(sessao: Sessao) {
    setSessao(sessao)
    setVisivel('form')
  }

  function novaSessao() {
    setSessao(Sessao.vazio())
    setVisivel("form")
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
      const novaSessao = await cadastrarSessao(sessao);
      setVisivel("tabela");
    } catch (error) {
      console.error("Erro ao salvar sessão:", error);
    }
  }

  async function alterarSessao(sessao: Sessao) {
    try {
      const sessaoAtualizada = await atualizarSessao(sessao);
      setVisivel("tabela");
    } catch (error) {
      console.error("Erro ao atualizar sessão:", error);
    }
  }

  function salvarOuAlterarSessao(sessao: Sessao) {
    if (sessao.id) {
      alterarSessao(sessao)
    } else {
      salvarSessao(sessao)
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
      <Layout titulo="Cadastro de sessões">
        {visivel === 'tabela' ? (
          <> <div className="flex justify-end">
            <Botao className="mb-4" cor="bg-gradient-to-r from-red-500 to-red-700"
              onClick={() => novaSessao()}>
              Nova Sessão </Botao>
          </div>
            <Tabela sessoes={sessoes}
              sessaoSelecionada={sessaoSelecionada}
              sessaoExcluida={sessaoExcluida}></Tabela>
          </>
        ) : (<Formulario sessao={sessao}
          sessaoMudou={salvarOuAlterarSessao}
          cancelado={() => setVisivel('tabela')} />
        )}
      </Layout>
    </div>
  )
}