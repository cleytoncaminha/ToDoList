import { todoController } from "@server/controller/todo";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    // eslint-disable-next-line no-console
    if (request.method === "PUT") {
        todoController.toggleDone(request, response);
        return;
    }

    response.status(405).json({
        error: {
            message: "method not allowed",
        },
    });
}
