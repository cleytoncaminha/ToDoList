import { read } from "@db-crud-todo";

interface TodoRepositoryGetParams {
    page?: number;
    limit?: number;
}

function get(
    { page, limit }: TodoRepositoryGetParams = {
        page: 1,
        limit: 2,
    }
) {
    const ALL_TODOS = read();

    return {
        todos: ALL_TODOS,
    };
}

export const todoRepository = {
    get,
};
