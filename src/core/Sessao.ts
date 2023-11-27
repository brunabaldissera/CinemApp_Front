import { stringParaEntradaDeData } from "@/utils/converters";
import Ticket from "./Ticket";

export default class Sessao {
  id: number | null;
  filmname: string;
  data: string;
  description: string;
  status: string;
  tickets: Ticket[];

  constructor(
    id: number | null,
    filmname: string,
    data: string,
    description: string,
    status: string,
    tickets: Ticket[]
  ) {
    this.id = id;
    this.filmname = filmname;
    this.data = data;
    this.description = description;
    this.status = status;
    this.tickets = tickets
  }

  static vazio(): Sessao {
    return new Sessao(null, "", stringParaEntradaDeData(""), "", "", []);
  }
}
