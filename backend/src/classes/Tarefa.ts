export class Tarefa {

    id: number | null;
    titulo: string | null;
    concluido: boolean | null;

    constructor(id?: number | null, titulo?: string, concluido?: boolean) {

        if(id !== undefined && titulo !== undefined && concluido !== undefined) {
            this.id = null;
            this.titulo = titulo;
            this.concluido = concluido;
        } 
        
        this.id = id || null;
        this.titulo = titulo || null;
        this.concluido = concluido || null;

    }

}