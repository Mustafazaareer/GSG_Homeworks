"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const logger = (req, res, next) => {
    console.log(`${new Date()} [${req.method} ${req.path}]`);
    res.locals.logMessage = `${new Date()} [${req.method} ${req.path}]`;
    console.log(JSON.stringify(req.headers));
    next();
};
exports.logger = logger;
