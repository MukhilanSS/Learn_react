package com.example.demo.controller;

import com.example.demo.model.Book;
import com.example.demo.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/books")
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping
    public List<Book> getBooks() {
        return bookService.getAllBooks();
    }

    // ✅ Add New Book
    @PostMapping("/insert")
    public Book createBook(@RequestBody Book book) {
        return bookService.addBook(book);
    }

    // ✅ Fetch Book by ID
    @GetMapping("/{id}")
    public Book getBookById(@PathVariable String id) {
        return bookService.getBookByID(id);
    }

    // ✅ Update Book
    @PutMapping("/update/{id}")
    public Book updateBook(@PathVariable String id, @RequestBody Book book) {
        return bookService.updateBook(id, book);
    }

    // ✅ Delete Book
    @DeleteMapping("/{id}")
    public String deleteBook(@PathVariable String id) {
        bookService.deleteBook(id);
        return "Book Deleted Successfully";
    }
}
