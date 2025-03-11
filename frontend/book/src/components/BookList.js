import { useEffect, useState } from "react";
import { deleteBook,getAllBooks } from "../service/BookService";
import React, { useRef } from "react";

const BookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await getAllBooks();
            setBooks(response.data);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    const handleDelete = async (id) => {
        await deleteBook(id);
        fetchBooks(); // Refresh book list after delete
    };

    return (
        <div>
            <h2>Book List</h2>
            <ul>
                {books.map((book) => (
                    <li key={book._id}>
                        {book.bookName} by {book.authorName}
                        <button onClick={() => handleDelete(book._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;
