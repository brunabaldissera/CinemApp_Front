import Sessao from "@/core/Sessao";
import Entrada from "./entrada";
import { useState } from "react";
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
  const [status, setStatus] = useState(props.sessao?.status);
  const opcoesStatus = ["PREVISTO", "ABERTO", "ENCERRADO", "CANCELADO"];

  return (
    <div>
      {id ? (
        <Entrada texto="ID" valor={id} somenteLeitura></Entrada>
      ) : (
        false
      )}
      <Entrada
        texto="Nome do Filme"
        valor={filmname}
        onChange={setNome}
      ></Entrada>
      <Entrada
        texto="Data"
        tipo="date"
        valor={stringParaEntradaDeData(data)}
        onChange={setData}
      ></Entrada>
      <Entrada
        texto="Descrição"
        valor={descricao}
        onChange={setDescricao}
      ></Entrada>
      <Dropdown options={opcoesStatus} value={status} onChange={setStatus} />
      <div className="flex justify-end mt-5">
        <Botao
          className="mr-3"
          cor="bg-gradient-to-r from-red-500 to-red-700"
          onClick={() =>
            props.sessaoMudou?.(
              new Sessao(id, filmname, data, descricao, status)
            )
          }
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