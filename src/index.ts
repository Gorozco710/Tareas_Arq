import express from "express";
import booksRouter, { books } from "./routes/books";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        mensaje: "API Biblioteca Digital funcionando"
    });
});

app.use("/books", booksRouter);

app.get("/health/fitness", (req, res) => {
    const totalBooks = books.length;
    const borrowedBooks = books.filter(book => book.prestado).length;

    const borrowedRatio = totalBooks === 0
        ? 0
        : borrowedBooks / totalBooks;

    const capacityHealthy = totalBooks <= 100;
    const ratioHealthy = borrowedRatio < 0.8;

    const healthy = capacityHealthy && ratioHealthy;

    const report = {
        status: healthy ? "Healthy" : "Degradacion de Calidad",
        metrics: {
            totalBooks,
            borrowedBooks,
            borrowedRatio: `${(borrowedRatio * 100).toFixed(2)}%`
        },
        rules: {
            capacity: capacityHealthy,
            borrowedRatio: ratioHealthy
        }
    };

    res.status(healthy ? 200 : 503).json(report);
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});