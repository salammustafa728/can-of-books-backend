const express = require('express') // require the express package
const app = express() // initialize your express app instance

const mongoose = require('mongoose');
const cors = require('cors'); // enable the communication between the frontend and the backend
app.use(cors())
app.use(express.json());
require('dotenv').config();
const PORT = process.env.PORT;
const {seedUserData} = require('./models/user.model');

const {getBooks,createBook,updateBook,deleteBook } = require('./controllers/Book.controller');


mongoose.connect(process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }
);

seedUserData();
app.get('/',(x,y)=>{
    y.send('work');
});
app.get('/books',getBooks );

app.post('/books', createBook);
app.put('/books/:book_idx',updateBook);
app.delete('/books/:book_idx',deleteBook);

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});