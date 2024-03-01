import express from 'express'
import {Book} from '../models/bookModel.js'

const router = express.Router();

// Route for saving a new Book
router.post('/', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
                mssg: 'Send all required fields: title, author, publishYear',
            });
        }
        
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };

        // Assuming Book model is defined elsewhere
        const book = await Book.create(newBook);
        
        return res.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ mssg: error.message });
    }
});

//Route for get all books from database
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});
        console.log(books,"abcd")
        return res.status(200).json({
            count: books.length,
            data:books 
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({mssg: error.message})
    }
})

//Route for get one books from database by id
router.get('/:id', async (req, res) => {
    try {

        const {id} = req.params;
        const book = await Book.findById(id);
        return res.status(200).json(book)
    } catch (error) {
        console.log(error.message)
        res.status(500).send({mssg: error.message})
    }
})

//route for update a book
router.put('/:id',async (req, res) => {
    try{
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            return res.status(400).send({
                mssg: 'send all required fields : title , author, publishYear',
            })
        }
        const {id} =req.params;
        const result = await Book.findByIdAndUpdate(id, req.body)
    if( !result ){
        return res.status(404).json({mssg:'book updated successfully'})
    }
      return res.status(200).send({mssg: 'Book updated successfully'})

    }catch(error) {
        console.log(error.message)
        res.status(500).send({mssg: error.message})
    }
})

//Route for delete a book
router.delete('/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id);

        if( !result ){
            return res.status(404).json({mssg:'book not found'})
        }
          return res.status(200).send({mssg: 'Book deleted successfully'})
    
        
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({mssg: error.message})
    }
})

export default router;