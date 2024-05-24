import { Tarefa } from "./Tarefa";

// Importando Conexão com banco de dados
const bd = require("./../banco-de-dados/conexao");

export class TarefaMetodos {

    private conexao: any;

    constructor() {
        this.conexao = bd;
    }

    async selecionarTodas() {
        return this.conexao.manyOrNone("SELECT * FROM tarefas");
    }

    async selecionarUltimaTarefa() {
        return await this.conexao.any("SELECT * FROM tarefas ORDER BY id DESC LIMIT 1");
    }

    async selecionar(id: number) {
        return await this.conexao.oneOrNone("SELECT * FROM tarefas WHERE id = $1", id);
    }

    async salvar(id: number, titulo: string) {
        const tarefa: Tarefa = new Tarefa(id, titulo);
        await this.conexao.any("INSERT INTO tarefas (titulo) VALUES ($1)", [tarefa.titulo]);
        return this.selecionarUltimaTarefa();
    }

    async atualizar(id: number, titulo: string) {

        if(titulo != null) {
            this.conexao.any("UPDATE tarefas SET titulo = $1 WHERE id = $2", [titulo, id]);
            return this.conexao.oneOrNone("SELECT * FROM tarefas WHERE id = $1", id)
        }
        
    }

    async atualizarEstado(id: number, concluido: boolean) {

        if(concluido != null) {
            this.conexao.any("UPDATE tarefas SET concluido = $1 WHERE id = $2", [concluido, id]);
            return this.conexao.oneOrNone("SELECT * FROM tarefas WHERE id = $1", id);
        }
        
    }

    async deletar(id: number) {
        this.conexao.any("DELETE FROM tarefas WHERE id = $1", id);
        let msg = "Tarefa com o id " + id + " deletada";
        return msg;
    }

}