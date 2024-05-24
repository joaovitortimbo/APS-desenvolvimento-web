const url = "http://localhost:3333/tarefas";
const tarefasBD = [];

async function listarTarefas() {
    try {

        await fetch(url)
            .then(res => res.json())
            .then(data => {

                data.map(tarefa => {
                    tarefasBD.push(tarefa);
                })

                renderizarTarefas(tarefasBD);

            })
        
    } catch (error) {
        console.log("Erro ao carregar as tarefas:", error);
    }
}

async function criarTarefa() {

    const tituloTarefaInput = document.getElementById('createTask');


    const novaTarefa = {
        titulo: tituloTarefaInput.value,
        concluida: false
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novaTarefa)
        });

        if (!response.ok) {
            throw new Error('Erro ao criar tarefa');
        }

        // Após criar a tarefa com sucesso, adiciona ela ao array local de tarefas
        tarefasBD.push(novaTarefa);

        // Renderiza novamente todas as tarefas, incluindo a nova
        renderizarTarefas();

        // Limpa o campo de input após adicionar a tarefa
        tituloTarefaInput.value = '';

        window.location.reload();

    } catch (error) {
        console.log("Erro ao criar a tarefa:", error);
    }
}

async function selecionarTarefa() {

    try {

        const urlString = window.location.search;
        const urlParams = new URLSearchParams(urlString);
        const idTarefa = urlParams.get("idTarefa");

        await fetch(url + "/" + idTarefa)
            .then(res => res.json())
            .then(data => {
               
               
                renderizarTarefaSelecionada(
                    {
                        titulo: data.titulo,
                        descricao: data.descricao,
                        criadoEm: data.criado_em,
                        atualizadoEm: new Date()
                    }
                );

            })
            .catch(error => console.log("Error: " + error));

    } catch (e) {
        console.error("Erro ao obter dados da URL:", e);
    }

}

async function editarTarefa() {

    const urlString = window.location.search;
    const urlParams = new URLSearchParams(urlString);
    const idTarefa = urlParams.get("idTarefa");

    const titulo = document.getElementById("tituloInput");
   


    try {
        // Enviando os dados para a API usando Fetch
        await fetch(`${url}/${idTarefa}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                titulo: titulo.value,
            })
        });

        window.location.reload();

    } catch (error) {
        console.error("Erro ao cadastrar tarefa:", error);
    }


}

async function deletarTarefa(id) {

    try {
        // Enviando os dados para a API usando Fetch
        let response = await fetch(url + "/" + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });


        alert("Tarefa excluída!");

        window.location.reload(); // atualiza a página

    } catch (error) {
        console.error("Erro ao deletar tarefa:", error);
    }

}

async function marcarTarefa(id, concluido) {

    let estaConcluido;

    if(concluido) {
        estaConcluido = false;
    } else {
        estaConcluido = true;
    }

    try {
        // Enviando os dados para a API usando Fetch
        await fetch(`${url}/${id}/estado`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                concluido: estaConcluido
            })
        });

    } catch (error) {
        console.error("Erro ao marcar tarefa:", error);
    }

}

function renderizarTarefas() {
    const allTasks = document.getElementById('allTasks');
    allTasks.innerHTML = '';

    tarefasBD.forEach(tarefa => {
        const novaTarefaDiv = document.createElement("div");
        novaTarefaDiv.className = 'contentTask';

        novaTarefaDiv.innerHTML = `
            <input type="checkbox" name="completed" id="completed_${tarefa.id}"  ${tarefa.concluido ? 'checked' : ''} onclick="marcarTarefa(${tarefa.id}, ${tarefa.concluido})">
            <div class="task">
                <h2 class="titleTask">${tarefa.titulo}</h2>
                <div class="containerOptions">
                    <button class="edit"><a href="paginas/editar.html?idTarefa=${tarefa.id}">Editar</a></button>
                    <button type="button" onclick="deletarTarefa(${tarefa.id})" class="delete">Deletar</button>
                </div>
            </div>
        `;

        allTasks.appendChild(novaTarefaDiv);
    });
}

function renderizarTarefaSelecionada(tarefa) {
    const titulo = document.getElementById("tituloTarefa");
    titulo.innerText = tarefa.titulo;
}