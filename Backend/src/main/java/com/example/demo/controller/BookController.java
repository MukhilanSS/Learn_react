package com.example.demo.controller;

import com.example.demo.model.Book;
import com.example.demo.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
public class BookController {
    @Autowired
    private BookService bookService;

    @GetMapping
    public List<Book> getBooks(){
        return bookService.getAllBooks();
    }

    @PostMapping("/add") //automatically deserializes the JSON into a Java type
    public Book createBook(@RequestBody Book book){
        return bookService.addBook(book);
    }
    @DeleteMapping("/{id}") //Extracts {id} from the URL and uses it in the method.
    public void deleteBook(@PathVariable String id){
        bookService.deleteBook(id);
    }
}

