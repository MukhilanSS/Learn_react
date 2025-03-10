package com.example.demo.service;

import com.example.demo.model.Book;
import com.example.demo.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service //Business logic Layer
public class BookService {
    @Autowired
    private BookRepository bookRepository;

    public List<Book> getAllBooks(){
//        System.out.println(bookRepository.findAll());
        return bookRepository.findAll();
    }
    public Book addBook(Book book){
        return bookRepository.save(book);
    }
//    public void updateBook(Book book){
//        bookRepositor
//    }
    public void deleteBook(String id){
        bookRepository.deleteById(id);
    }

}
