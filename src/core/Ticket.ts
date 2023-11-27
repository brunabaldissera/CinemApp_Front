import { stringParaEntradaDeData } from "@/utils/converters";

export default class Ticket {
  id: number | null;
  usuario_id: number;
  sessao_id: number;
  data: string;

  constructor(
    id: number | null,
    usuario_id: number,
    sessao_id: number,
    data: string
  ) {
    this.id = id;
    this.usuario_id = usuario_id;
    this.sessao_id = sessao_id;
    this.data = data;
  }

  static vazio(): Ticket {
    return new Ticket(null, 0, 0, stringParaEntradaDeData(""));
  }
}