import Fastify from "fastify";
import { rotas } from "./rotas";
import fastifyCors from "@fastify/cors";

const app = Fastify({logger: true})

async function iniciarServidor() {

    // adicionar rotas no servidor
    await app.register(rotas);

    //Adicionando Cors
    await app.register(fastifyCors);

    //colocar porta do servidor
    app.listen({ port: 3333 }); 
    
}

// Iniciando servidor, acesso na URL: http://localhost:3333
iniciarServidor();