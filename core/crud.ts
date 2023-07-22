/* eslint-disable no-console */
import fs from "fs";
import { v4 as uuid } from "uuid";

const DB_FILE_PATH = "./core/db";

type UUID = string;

interface Todo {
    id: UUID;
    date: string;
    content: string;
    done: boolean;
}

function clearDB() {
    fs.writeFileSync(DB_FILE_PATH, "");
}

export function create(content: string): Todo {
    const todo: Todo = {
        id: uuid(),
        date: new Date().toISOString(),
        content,
        done: false,
    };

    const todos = [...read(), todo];

    fs.writeFileSync(
        DB_FILE_PATH,
        JSON.stringify(
            {
                todos,
            },
            null,
            2
        )
    );
    return todo;
}

export function read(): Array<Todo> {
    const dbString = fs.readFileSync(DB_FILE_PATH, "utf-8");
    const db = JSON.parse(dbString || "{}");
    if (!db.todos) {
        return [];
    }
    return db.todos;
}

export function update(id: UUID, partialTodo: Partial<Todo>): Todo {
    let updatedTodo;
    const todos = read();
    todos.forEach((currentTodo) => {
        const isToupdate = currentTodo.id === id;
        if (isToupdate) {
            updatedTodo = Object.assign(currentTodo, partialTodo);
        }
    });

    fs.writeFileSync(
        DB_FILE_PATH,
        JSON.stringify(
            {
                todos,
            },
            null,
            2
        )
    );

    if (!updatedTodo) {
        throw new Error("Please, provide another id");
    }

    return updatedTodo;
}

export function updateContentById(id: UUID, content: string): Todo {
    return update(id, {
        content,
    });
}

export function deleteById(id: UUID) {
    const todos = read();

    const todosWithoutOne = todos.filter((todo) => {
        if (todo.id === id) {
            return false;
        }
        return true;
    });

    fs.writeFileSync(
        DB_FILE_PATH,
        JSON.stringify(
            {
                todos: todosWithoutOne,
            },
            null,
            2
        )
    );
}
clearDB();
create("1 todo");
const secondTodo = create("2 todo");
deleteById(secondTodo.id);
create("3 todo");
create("4 todo");
create("5 todo");
/*
update(thirdTodo.id, {
    content: "3 todo atualizada",
});

updateContentById(thirdTodo.id, "terceira todo");

const todos = read();
console.log(todos);
console.log(todos.length);*/
