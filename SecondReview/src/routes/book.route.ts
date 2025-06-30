import express from "express";
import { getBook, createBook } from "../controllers/book.controller";
const route = express.Router();

route.post("/book", createBook);

route.post("/book/page", getBook);

export default route;
