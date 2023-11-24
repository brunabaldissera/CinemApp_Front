import { stringParaEntradaDeData } from "@/utils/converters";

export default class Sessao {
    id: number | null;
    filmname: string;
    data: string;
    description: string;
    status: string;

    constructor(id: number | null, filmname: string, data: string,
        description: string, status: string) {
        this.id = id;
        this.filmname = filmname;
        this.data = data;
        this.description = description;
        this.status = status;
    }

    static vazio(): Sessao {
      return new Sessao(null, "", stringParaEntradaDeData(""), "", "");
    }
}