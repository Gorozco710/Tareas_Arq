import { Router, Request, Response } from "express";

interface Book {
    id: number;
    titulo: string;
    autor: string;
    anio: number;
    prestado: boolean;
}

export const books: Book[] = [];

const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.status(200).json(books);
});

router.post("/", (req: Request, res: Response) => {
    if (!req.is("application/json")) {
        return res.status(415).json({
            error: "El cuerpo de la solicitud debe ser JSON"
        });
    }

    const { titulo, autor, anio, prestado } = req.body;

    if (!titulo || !autor || !anio) {
        return res.status(400).json({
            error: "titulo, autor y anio son obligatorios"
        });
    }

    const newBook: Book = {
        id: books.length + 1,
        titulo,
        autor,
        anio,
        prestado: prestado ?? false
    };

    books.push(newBook);

    res.status(201).json(newBook);
});

export default router;