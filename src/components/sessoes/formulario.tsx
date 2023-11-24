import React, { useState } from "react";
import Sessao from "@/core/Sessao";
import Entrada from "./entrada";
import { stringParaEntradaDeData } from "@/utils/converters";
import Botao from "./botao";
import Dropdown from "./dropdown";

interface FormularioProps {
  sessao: Sessao;
  sessaoMudou?: (sessao: Sessao) => void;
  cancelado?: () => void;
}

export default function Formulario(props: FormularioProps) {
  const id = props.sessao?.id;
  const [filmname, setNome] = useState(props.sessao?.filmname);
  const [data, setData] = useState(props.sessao?.data);
  const [descricao, setDescricao] = useState(props.sessao?.description);
  const [status, setStatus] = useState(props.sessao?.status || "PREVISTO");
  const opcoesStatus = ["PREVISTO", "ABERTO", "ENCERRADO", "CANCELADO"];

  const [mostrarAviso, setMostrarAviso] = useState(false);

  const validarCampos = () => {
    if (!filmname || !data || !descricao || !status) {
      setMostrarAviso(true);
      return false;
    }
    return true;
  };

  const handleSalvarClick = () => {
    if (validarCampos()) {
      setMostrarAviso(false);
      props.sessaoMudou?.(new Sessao(id, filmname, data, descricao, status));
    }
  };

  return (
    <div>
      {id ? (
        <Entrada texto="ID" valor={id} somenteLeitura></Entrada>
      ) : (
        false
      )}
      <Entrada texto="Nome do Filme" valor={filmname} onChange={setNome}></Entrada>
      <Entrada
        texto="Data"
        tipo="date"
        valor={stringParaEntradaDeData(data)}
        onChange={setData}
      ></Entrada>
      <Entrada texto="Descrição" valor={descricao} onChange={setDescricao}></Entrada>
      <Dropdown options={opcoesStatus} value={status} onChange={setStatus} />
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