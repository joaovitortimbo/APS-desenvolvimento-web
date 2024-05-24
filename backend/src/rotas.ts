import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { TarefaMetodos } from "./classes/TarefaMetodos";
import { Tarefa } from "./classes/Tarefa";


export const rotas = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {

    const tarefaMetodos = new TarefaMetodos();

    fastify.get("/tarefas", async (req: FastifyRequest, reply: FastifyReply) => {
        const tarefasAtivas: Tarefa[] = await tarefaMetodos.selecionarTodas();  
        reply.send(tarefasAtivas);
    });

    fastify.get(`/tarefas/:id`, async (req: FastifyRequest, reply: FastifyReply) => {
        const params = req.params as { id: string };
        const id: number = parseInt(params.id);

        const tarefaSelecionada: Tarefa = await tarefaMetodos.selecionar(id);
        reply.send(tarefaSelecionada);
    });

    fastify.post("/tarefas", async (req: FastifyRequest, reply: FastifyReply) => {
        const { id, titulo}: any = req.body;
        const tarefaSalva: Tarefa = await tarefaMetodos.salvar(id, titulo);
        reply.send(tarefaSalva);
    });

    fastify.patch("/tarefas/:id", async (req: FastifyRequest, reply: FastifyReply) => {
        const params = req.params as { id: string };
        const id = parseInt(params.id);
        const { titulo }: any = req.body;
        
        const tarefaAtualizada: Tarefa = await tarefaMetodos.atualizar(id, titulo);
        reply.send(tarefaAtualizada);
    });

    fastify.patch("/tarefas/:id/estado", async (req: FastifyRequest, reply: FastifyReply) => {
        const params = req.params as { id: string };
        const { concluido }: any = req.body;
        const id = parseInt(params.id);

        const tarefaAtualizada: Tarefa = await tarefaMetodos.atualizarEstado(id, concluido);
        reply.send(tarefaAtualizada);
    });

    fastify.delete(`/tarefas/:id`, async (req: FastifyRequest, reply: FastifyReply) => {
        const params = req.params as { id: string };
        const id = parseInt(params.id);

        const msg: string = await tarefaMetodos.deletar(id);
        reply.send(msg);
    });

}