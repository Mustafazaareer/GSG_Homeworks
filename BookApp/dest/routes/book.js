"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MOCK_DATA_2_js_1 = __importDefault(require("../data/MOCK_DATA-2.js"));
const uuid_1 = require("uuid");
const router = express_1.default.Router();
router.use((req, res, next) => {
    console.log("hi there from book route");
    next();
});
router.get('/', (req, res) => {
    const page = parseInt(req.query.page || '1');
    const pageSize = parseInt(req.query.pageSize || '5');
    const booksArr = MOCK_DATA_2_js_1.default.slice((page - 1) * pageSize, page * pageSize);
    res.status(200).send({
        page,
        pageSize,
        total: MOCK_DATA_2_js_1.default.length,
        books: booksArr
    });
});
router.post('/', (req, res) => {
    if (!req.body.title || !req.body.author) {
        res.status(400);
        return;
    }
    const newTask = {
        id: parseInt((0, uuid_1.v4)()),
        title: req.body.title,
        author: req.body.author,
        publicationYear: req.body.publicationYear,
    };
    MOCK_DATA_2_js_1.default.unshift(newTask);
    res.status(201).send(newTask);
});
router.put('/:bookId', (req, res) => {
    var id = Number(req.params.bookId);
    console.log(id);
    const book = MOCK_DATA_2_js_1.default.find(element => element.id === id);
    console.log(book);
    if (book) {
        book.author = req.body.author || book.author;
        book.title = req.body.title || book.title;
        book.publicationYear = req.body.publicationYear || book.publicationYear;
        const index = MOCK_DATA_2_js_1.default.findIndex((book) => { book.id === Number(id); });
        MOCK_DATA_2_js_1.default[index] = book;
        res.json({ book: book });
    }
    else {
        res.send("Not Found!");
    }
});
router.delete('/:bookId', (req, res) => {
    var id = Number(req.params.bookId);
    console.log(id);
    const book = MOCK_DATA_2_js_1.default.find(element => element.id === id);
    const index = MOCK_DATA_2_js_1.default.findIndex(element => element.id === id);
    console.log(book);
    if (book) {
        MOCK_DATA_2_js_1.default.splice(index, 1);
        console.log("book deleted");
        res.json({ books: MOCK_DATA_2_js_1.default });
    }
    else {
        res.send("Not Found!");
    }
});
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const book = MOCK_DATA_2_js_1.default.find(b => b.id === parseInt(id));
    if (book) {
        res.json({ book: book });
    }
    else {
        res.status(404).send("not found");
    }
});
router.get('/title/:title', (req, res) => {
    var title = req.body.title;
    console.log("Mustafa");
    const book = MOCK_DATA_2_js_1.default.find(element => element.title === title);
    if (book) {
        res.json({ book: book });
    }
    else {
        res.status(404).send("not found");
    }
});
router.get('/publicationYear/:publicationYear', (req, res) => {
    var publicationYear = Number(req.params.publicationYear);
    console.log("Mustafa");
    const book = MOCK_DATA_2_js_1.default.find(element => element.publicationYear === publicationYear);
    if (book) {
        res.json({ book: book });
    }
    else {
        res.status(404).send("not found");
    }
});
exports.default = router;
