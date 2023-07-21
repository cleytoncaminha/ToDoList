const BASE_URL = "http://localhost:3000";

describe("/ - Todos feed", () => {
    it("when load, renders the page", () => {
        cy.visit(BASE_URL);
    });

    it("when create a new todo, it must appears in the screen", () => {
        cy.intercept("POST", `${BASE_URL}/api/todos`, (request) => {
            request.reply({
                statusCode: 201,
                body: {
                    todo: {
                        id: "9c987ba7-bcb5-4ae3-be98-dce10bc0cc4c",
                        date: "2023-07-21T22:47:46.246Z",
                        content: "test todo",
                        done: false,
                    },
                },
            });
        }).as("createTodo");

        cy.visit(BASE_URL);
        cy.get('[name="add-todo"]').type("test todo");
        cy.get('[data-cy="submit-todo"]').click();
        cy.get("table > tbody").contains("test todo");
    });
});
