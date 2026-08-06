import express, { Request, Response } from "express";
// src/index.ts
import swaggerUi from 'swagger-ui-express';
const swaggerDocument = require('./docs/swagger.json');

const app = express();
const PORT = 3000;

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());

interface User {
    id: number;
    nombre: string;
}

let users: User[] = [
    { id: 1, nombre: "Juan" },
    { id: 2, nombre: "Ana" }
];

app.get("/users", (req: Request, res: Response) => {
    res.status(200).json(users);
});

app.get("/users/:id", (req: Request, res: Response) => {

    const id = Number(req.params.id);

    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({
            mensaje: "Usuario no encontrado"
        });
    }

    res.status(200).json(user);
});

app.post("/users", (req: Request, res: Response) => {

    const nuevo: User = req.body;

    users.push(nuevo);

    res.status(201).json({
        mensaje: "Usuario creado",
        usuario: nuevo
    });

});

app.put("/users/:id", (req: Request, res: Response) => {

    const id = Number(req.params.id);

    const index = users.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).json({
            mensaje: "Usuario no encontrado"
        });
    }

    users[index] = req.body;

    res.status(200).json(users[index]);

});

app.patch("/users/:id", (req: Request, res: Response) => {

    const id = Number(req.params.id);

    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({
            mensaje: "Usuario no encontrado"
        });
    }

    Object.assign(user, req.body);

    res.status(200).json(user);

});

app.delete("/users/:id", (req: Request, res: Response) => {

    const id = Number(req.params.id);

    const index = users.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).json({
            mensaje: "Usuario no encontrado"
        });
    }

    users.splice(index, 1);

    res.status(204).send();

});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});