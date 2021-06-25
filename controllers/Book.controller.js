'use strict';

const { request } = require('express');
const {userModel} = require('../models/user.model');

const getBooks = (req , res) => {
    const {email}= req.query;
    console.log( req.query);
    userModel.findOne({email:email}, (error, user) => {
        console.log(user)
        if (error){
            res.send(error)
        }
        else{
            console.log(user)
            res.json(user)   
        }
    });
   
}
const createBook = (request, responce) => {
    const { email, name, description, status } = request.body;
    console.log(request.body);
    // responce.send('working correctly');
    userModel.findOne({ email: email }, (error, userData) => {
        if (error) {
            responce.status(400).send(error);        }
        else {
            console.log(userData);
            userData.books.push({ name: name, description: description, status: status });
            userData.save();
            responce.json(userData);
        }
    })
}
const updateBook = (request,responce)=>{
    const bookIndex=request.params.book_idx;
    const {email,name,description,status}=request.body;

    userModel.findOne({email: email},(error,userData)=>{
        if(error){
            responce.send(error)
        }else{
            userData.books.splice(bookIndex,1,{name: name,description: description, status: status });
            userData.save();
            responce.send(userData)
        }
    });
}
const deleteBook =(req,res)=>{
    const bookIndex= req.params.book_idx;
    const { email} = req.query;
    userModel.findOne({ email: email }, (error, userData) => {
     if (error) {
         res.send(error);     }
     else { userData.books.splice(bookIndex , 1 );
         userData.save();
         res.send(userData);     }
 })
    console.log(req.params); }
    
module.exports = {
    getBooks,
    createBook,
    updateBook,
    deleteBook
};
