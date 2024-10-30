import express  from "express";
import { Book } from "../models/BookModel.js";

const router = express.Router();

// Route to save a new book
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishyear
        ) {
            return response.status(400).send({
                message: 'Send all requested fields: title, author, publishyear',
            });
        }

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishyear: request.body.publishyear,
        };

        const book = await Book.create(newBook); 

        return response.status(201).send(book); 
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// Route to get all books
router.get('/', async (request, response) => {
    try {
        const books = await Book.find(); // Retrieve all books from the database
        return response.status(200).send({      // Send the list of books as the response
            count: books.length,
            data: books
        }); 
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// Route to get one book
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const book = await Book.findById(id); // Retrieve all books from the database
        return response.status(200).send(book);      // Send the list of books as the response 
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

//Route for update a book
router.put('/:id', async (request, response) => {
    try{
        if (!request.body.title ||
            !request.body.author ||
            !request.body.publishyear
        ) {
            return response.status(400).send({
                message: 'Send all requested fields: title, author, publishyear',
            });
        }

        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);

        if(!request)
        {
            return response.status(404).json({message: 'Book not found'});
        }
        return response.status(200).json({message: 'Book Updated Successfully'});
    
    }catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    } 

});

//Route for delete a book
router.delete('/:id', async(request, response) => {
    try{
        const{ id } = request.params;
        const result = await Book.findByIdAndDelete(id, request.body);
        if(!request)
        {
            return response.status(404).json({message: 'Book not found'});
        }
        return response.status(200).json({message: 'Book Deleted Successfully'});
    
    }catch (error){
        console.log(error.message);
        return response.status(500).send({message: error.message});
    }
});

export default router;