CREATE TABLE tarefas(
	id serial primary key,
	titulo varchar not null,
	concluido boolean default(false)
);