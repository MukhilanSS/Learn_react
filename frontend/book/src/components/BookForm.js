import { useState } from "react";
import { addBook } from "../service/BookService";
import React, { useRef } from "react";

const BookForm = () => {
    const [book, setBook] = useState({
        bookName: "",
        authorName: "",
        authorMail: "",
        publisher: "",
        description: "",
        price: ""
    });

    const handleChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addBook(book);
            alert("Book added successfully!");
        } catch (error) {
            console.error("Error adding book:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="bookName" value={book.bookName} onChange={handleChange} placeholder="Book Name" />
            <input type="text" name="authorName" value={book.authorName} onChange={handleChange} placeholder="Author Name" />
            <input type="email" name="authorMail" value={book.authorMail} onChange={handleChange} placeholder="Author Email" />
            <input type="text" name="publisher" value={book.publisher} onChange={handleChange} placeholder="Publisher" />
            <textarea name="description" value={book.description} onChange={handleChange} placeholder="Description"></textarea>
            <input type="number" name="price" value={book.price} onChange={handleChange} placeholder="Price" />
            <button type="submit">Submit</button>
        </form>
    );
};

export default BookForm;
