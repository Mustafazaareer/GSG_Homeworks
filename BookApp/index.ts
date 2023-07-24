import express from 'express';
import  {logger}  from './middlewares/generic';
import bookRoute from './routes/book';

const app =express();
const PORT =3400;

app.use(express.json());
app.use(logger);
app.use('/book',bookRoute);

app.get('/',(req,res)=>{
    res.send('server runing')
})
app.all('*', (req, res, next) => {
    res.status(400).send(`Can't find this route: ${req.originalUrl}`);
});
app.listen(PORT,()=>{
    console.log(`app listening on port ${PORT}`)
})