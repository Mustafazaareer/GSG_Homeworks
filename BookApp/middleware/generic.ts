import express from 'express';

const logger = (req:express.Request, res:express.Response, next:express.NextFunction)=>{
    console.log(`${new Date()} [${req.method} ${req.path}]`);
    res.locals.logMessage =`${new Date()} [${req.method} ${req.path}]`;
    console.log(JSON.stringify(req.headers));
    next();
}

export {
    logger
    }