import express from 'express';
import Books from '../data/MOCK_DATA-2.js';
import Book from '../types/book.js';
import { v4 } from 'uuid';


const router = express.Router();
router.use((req,res,next)=>{
    console.log("hi there from book route");
    next();
})
router.get('/',(req: Book.Request,res:Book.Response)=>{
    const page =parseInt(req.query.page||'1');
    const pageSize =parseInt(req.query.pageSize||'5');
    const booksArr = Books.slice((page-1)*pageSize,page*pageSize);
    res.status(200).send({
        page,
        pageSize,
        total:Books.length,
        books:booksArr
    })
})

router.post('/',(req:Book.Request,res:Book.Response)=>{
    if(!req.body.title||!req.body.author){
        res.status(400);
        return;
    }
    const newTask:Book.item={
        id:parseInt(v4()),
        title:req.body.title,
        author:req.body.author,
        publicationYear:req.body.publicationYear,
    }
    Books.unshift(newTask);
    res.status(201).send(newTask);
})

router.put('/:bookId',(req:express.Request,res:express.Response)=>{
    var id =Number(req.params.bookId);
    console.log(id)
    const book = Books.find(element => element.id === id);
    console.log(book)
    if(book){
        book.author = req.body.author||book.author;
        book.title = req.body.title||book.title;
        book.publicationYear = req.body.publicationYear||book.publicationYear;
        const index =Books.findIndex((book)=>{book.id === Number(id)});
        Books[index] =book;
        res.json({book:book});
        }
        else{
            res.send("Not Found!")
        }
})


router.delete('/:bookId',(req:express.Request,res:express.Response)=>{
    var id =Number(req.params.bookId);
    console.log(id)
    const book = Books.find(element => element.id === id);
    const index = Books.findIndex(element => element.id === id);
    console.log(book)
    if(book){
            
            Books.splice(index,1);
            console.log("book deleted")
            res.json({books:Books});
    }else{
        res.send("Not Found!")
    }
})

router.get('/:id',(req:express.Request,res:express.Response)=>{
    const id =req.params.id;
    const book = Books.find(b=>b.id === parseInt(id));
    if(book){
        res.json({book:book});
    }else {
        res.status(404).send("not found")
    }
})
router.get('/title/:title',(req,res)=>{
    var title =req.body.title;
    console.log("Mustafa")
    const book = Books.find(element => element.title === title);
    if(book){
        res.json({book:book});
    }else{
        res.status(404).send("not found")
    }
})
router.get('/publicationYear/:publicationYear',(req:express.Request,res:express.Response)=>{
    var publicationYear =Number(req.params.publicationYear);
    console.log("Mustafa")
    const book = Books.find(element => element.publicationYear === publicationYear);
    if(book){
        res.json({book:book});
    }else{
        res.status(404).send("not found")
    }
})

export default router;