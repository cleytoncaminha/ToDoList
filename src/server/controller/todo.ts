import { todoRepository } from "@server/repository/todo";
import { z as schema } from "zod";
import { NextApiRequest, NextApiResponse } from "next";

async function get(req: NextApiRequest, res: NextApiResponse) {
    const query = req.query;
    const page = Number(query.page);
    const limit = Number(query.limit);

    if (query.page && isNaN(page)) {
        res.status(400).json({
            error: {
                message: "`page` must be a number",
            },
        });
        return;
    }
    if (query.limit && isNaN(limit)) {
        res.status(400).json({
            error: {
                message: "`limit` must be a number",
            },
        });
        return;
    }

    const output = todoRepository.get({
        page,
        limit,
    });

    res.status(200).json({
        total: output.total,
        pages: output.pages,
        todos: output.todos,
    });
}

const TodoCreateBodySchema = schema.object({
    content: schema.string(),
});
async function create(req: NextApiRequest, res: NextApiResponse) {
    const body = TodoCreateBodySchema.safeParse(req.body);
    if (!body.success) {
        res.status(400).json({
            message: "You need to provide a content to create a TODO",
            description: body.error.issues,
        });
        return;
    }
    const createdTodo = await todoRepository.createByContent(body.data.content);

    res.status(201).json({
        todo: createdTodo,
    });
}

async function toggleDone(req: NextApiRequest, res: NextApiResponse) {
    const todoId = req.query.id;
    if (!todoId || typeof todoId !== "string") {
        res.status(400).json({
            error: {
                message: "You must to provide a string ID",
            },
        });

        return;
    }

    try {
        const updatedTodo = await todoRepository.toggleDone(todoId);

        res.status(200).json({
            todo: updatedTodo,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({
                error: {
                    message: error.message,
                },
            });
        }
    }
}

export const todoController = {
    get,
    create,
    toggleDone,
};
