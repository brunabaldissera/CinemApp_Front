export default class User {
  id: number | null;
  nome: string;
  cidade: string;
  telefone: string;
  cpf: string;

  constructor(
    id: number | null,
    nome: string,
    cidade: string,
    telefone: string,
    cpf: string
  ) {
    this.id = id;
    this.nome = nome;
    this.cidade = cidade;
    this.telefone = telefone;
    this.cpf = cpf;
  }

  static vazio(): User {
    return new User(null, "", "", "", "");
  }
}