import React, { useState } from "react";
import Entrada from "./entrada";
import Botao from "./botao";
import User from "@/core/User";

interface FormularioProps {
  user: User;
  userMudou?: (user: User) => void;
  cancelado?: () => void;
}

export default function Formulario(props: FormularioProps) {
  const id = props.user?.id;
  const [nome, setNome] = useState(props.user?.nome);
  const [cidade, setCidade] = useState(props.user?.cidade);
  const [telefone, setFone] = useState(props.user?.telefone);
  const [cpf, setCPF] = useState(props.user?.cpf);

  const [mostrarAviso, setMostrarAviso] = useState(false);

  const validarCampos = () => {
    if (!nome || !cidade || !telefone || !cpf) {
      setMostrarAviso(true);
      return false;
    }
    return true;
  };

  const handleSalvarClick = () => {
    if (validarCampos()) {
      setMostrarAviso(false);
      props.userMudou?.(new User(id, nome, cidade, telefone, cpf));
    }
  };

  return (
    <div>
      {id ? (
        <Entrada texto="ID" valor={id} somenteLeitura></Entrada>
      ) : (
        false
      )}
      <Entrada texto="Nome" valor={nome} onChange={setNome}></Entrada>
      <Entrada texto="Cidade" valor={cidade} onChange={setCidade}></Entrada>
      <Entrada texto="Telefone" valor={telefone} onChange={setFone}></Entrada>
      <Entrada texto="CPF" valor={cpf} onChange={setCPF}></Entrada>
      <div className="flex justify-end mt-5">
        {mostrarAviso && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mr-3">
            Preencha todos os campos antes de salvar.
          </div>
        )}
        <Botao
          className="mr-3"
          cor="bg-gradient-to-r from-red-500 to-red-700"
          onClick={handleSalvarClick}
        >
          {id ? "Alterar" : "Salvar"}
        </Botao>
        <Botao
          cor="bg-gradient-to-r from-gray-500 to-gray-700"
          onClick={props.cancelado}
        >
          Cancelar
        </Botao>
      </div>
    </div>
  );
}