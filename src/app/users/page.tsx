'use client'
import React, { useEffect, useState } from "react";
import Layout from "@/components/users/layout";
import Tabela from "@/components/users/tabela";
import User from "@/core/User";
import Botao from "@/components/users/botao";
import Formulario from "@/components/users/formulario";
import { atualizarUser, cadastrarUser, excluirUser, fetchUsers } from "@/service/userService";

export default function Users() {
  const [user, setUser] = useState<User>(User.vazio())
  const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela')
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (visivel === 'tabela') {
      const loadUsers = async () => {
        try {
          const dados = await fetchUsers();
          setUsers(dados);
        } catch (error) {
          console.error("Erro ao buscar usuários:", error);
        }
      }
      loadUsers();
    }
  }, [visivel]);

  function userSelecionado(user: User) {
    setUser(user)
    setVisivel('form')
  }

  function novoUser() {
    setUser(User.vazio())
    setVisivel("form")
  }

  async function userExcluido(user: User) {
    const confirmacao =
      window.confirm("Tem certeza de que deseja excluir este usuário?");
    if (confirmacao) {
      try {
        if (user.id !== null) {
          await excluirUser(user.id);
        } else {
          console.error("userID é null!");
        }
        setUsers(prevUsers => prevUsers.filter(se => se.id !== user.id));
      } catch (error) {
        console.error("Erro ao excluir user:", error);
      }
    }
  }

  async function salvarUser(user: User) {
    try {
      const novoUser = await cadastrarUser(user);
      setVisivel("tabela");
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
    }
  }

  async function alterarUser(user: User) {
    try {
      const userAtualizado = await atualizarUser(user);
      setVisivel("tabela");
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  }

  function salvarOuAlterarUser(user: User) {
    if (user.id) {
      alterarUser(user)
    } else {
      salvarUser(user)
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
      <Layout titulo="Cadastro de usuários">
        {visivel === 'tabela' ? (
          <> <div className="flex justify-end">
            <Botao className="mb-4" cor="bg-gradient-to-r from-red-500 to-red-700"
              onClick={() => novoUser()}>
              Novo usuário </Botao>
          </div>
            <Tabela users={users}
              userSelecionado={userSelecionado}
              userExcluido={userExcluido}></Tabela>
          </>
        ) : (<Formulario user={user}
          userMudou={salvarOuAlterarUser}
          cancelado={() => setVisivel('tabela')} />
        )}
      </Layout>
    </div>
  )
}