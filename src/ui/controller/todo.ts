import { todoRepository } from "@ui/repository/todo";

interface todoControllerGetParams {
    page: number;
}

interface todoControllerCreateParams {
    content?: string;
    onError: () => void;
    onSuccess: (todo: any) => void;
}

async function get(params: todoControllerGetParams) {
    return todoRepository.get({
        page: params.page,
        limit: 2,
    });
}

function filterTodosByContent<Todo>(
    search: string,
    todos: Array<Todo & { content: string }>
) {
    const homeTodos = todos.filter((todo) => {
        const searchNormalized = search.toLocaleLowerCase();
        const contentNormalized = todo.content.toLocaleLowerCase();
        return contentNormalized.includes(searchNormalized);
    });

    return homeTodos;
}

function create({ content, onError, onSuccess }: todoControllerCreateParams) {
    if (!content) {
        onError();
        return;
    }
    const todo = {
        id: "!1231233",
        content,
        date: new Date(),
        done: false,
    };
    onSuccess(todo);
}

export const todoController = {
    get,
    filterTodosByContent,
    create,
};
