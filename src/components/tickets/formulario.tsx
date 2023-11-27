import React, { useState, useEffect } from "react";
import Entrada from "./entrada";
import Botao from "./botao";
import Ticket from "@/core/Ticket";
import DatePicker from "react-datepicker";
import { stringParaEntradaDeData } from "@/utils/converters";
import { fetchSessoes } from "@/service/sessaoService";
import { fetchUsers } from "@/service/userService";

import "react-datepicker/dist/react-datepicker.css";

interface FormularioProps {
  ticket: Ticket;
  ticketMudou?: (ticket: Ticket) => void;
  cancelado?: () => void;
}

export default function Formulario(props: FormularioProps) {
  const id = props.ticket?.id;
  const [sessoes, setSessoes] = useState<string[]>([]);
  const [usuarios, setUsuarios] = useState<string[]>([]);
  const [inputSessaoId, setInputSessaoId] = useState(props.ticket?.sessao_id?.toString() || "");
  const [inputUsuarioId, setInputUsuarioId] = useState(props.ticket?.usuario_id?.toString() || "");
  const [selectedData, setSelectedData] = useState<string>(props.ticket?.data || "");


  const [mostrarAviso, setMostrarAviso] = useState(false);

  const validarCampos = () => {
    if (!inputSessaoId || !inputUsuarioId || !selectedData) {
      setMostrarAviso(true);
      return false;
    }
    return true;
  };

  useEffect(() => {
    const carregarSessoes = async () => {
      try {
        const dadosSessoes = await fetchSessoes();
        setSessoes(dadosSessoes.map((sessao) => String(sessao.id)));
      } catch (error) {
        console.error("Erro ao buscar sessões:", error);
      }
    };

    const carregarUsuarios = async () => {
      try {
        const dadosUsuarios = await fetchUsers();
        setUsuarios(dadosUsuarios.map((usuario) => String(usuario.id)));
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    carregarSessoes();
    carregarUsuarios();
  }, []);


  const handleSalvarClick = () => {
    if (validarCampos()) {
      setMostrarAviso(false);
      props.ticketMudou?.(new Ticket(id, parseInt(inputUsuarioId), parseInt(inputSessaoId), selectedData));
    }
  };

  return (
    <div>
      {id ? (
        <Entrada texto="ID" valor={id} somenteLeitura></Entrada>
      ) : (
        false
      )}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          ID Sessão
        </label>
        <select
          value={inputSessaoId}
          onChange={(e) => setInputSessaoId(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="" disabled>
            Selecione uma sessão
          </option>
          {sessoes.map((sessao) => (
            <option key={sessao} value={sessao}>
              {sessao}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          ID Usuário
        </label>
        <select
          value={inputUsuarioId}
          onChange={(e) => setInputUsuarioId(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="" disabled>
            Selecione um usuário
          </option>
          {usuarios.map((user) => (
            <option key={user} value={user}>
              {user}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col mt-3">
        <label className="mb-2">Data e Hora</label>
        <DatePicker
          selected={selectedData ? new Date(selectedData) : null}
          onChange={(data: Date | null) =>
            data && setSelectedData(data.toISOString())
          }
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="Hora"
          dateFormat="yyyy-MM-dd HH:mm:ss"
          className="border border-red-500 rounded-lg
            focus:outline-none bg-gray-100 px-4 py-2 
            focus:bg-white"
        />
      </div>
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