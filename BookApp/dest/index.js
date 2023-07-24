"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const generic_1 = require("./middlewares/generic");
const book_1 = __importDefault(require("./routes/book"));
const app = (0, express_1.default)();
const PORT = 3400;
app.use(express_1.default.json());
app.use(generic_1.logger);
app.use('/book', book_1.default);
app.get('/', (req, res) => {
    res.send('server runing');
});
app.all('*', (req, res, next) => {
    res.status(400).send(`Can't find this route: ${req.originalUrl}`);
});
app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
});
