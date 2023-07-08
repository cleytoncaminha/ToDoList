import { todoRepository } from "@ui/repository/todo";

interface todoControllerGetParams {
    page?: number;
}

async function get({ page }: todoControllerGetParams = {}) {
    return todoRepository.get({
        page: page || 1,
        limit: 1,
    });
}

export const todoController = {
    get,
};
