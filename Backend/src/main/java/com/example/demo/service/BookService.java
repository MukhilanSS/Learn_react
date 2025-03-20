package com.example.demo.service;
import com.example.demo.model.Book;
import com.example.demo.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service //Business logic Layer
public class BookService {
    @Autowired
    private BookRepository bookRepository;
    public Page<Book> getPaginatedBooks(int page, int size, String searchTerm) {
        Pageable pageable = PageRequest.of(page - 1, size);

        if (searchTerm != null && !searchTerm.isEmpty()) {
            return bookRepository.findByBookNameContainingIgnoreCase(searchTerm, pageable);
        }

        return bookRepository.findAll(pageable);
    }

    public List<Book> getAllBooks(){
//        System.out.println(bookRepository.findAll());
        return bookRepository.findAll();
    }
    public Book addBook(Book book){
        Optional<Book> existing=bookRepository.findByBookNameAndAuthorNameStartingWith(book.getBookName(),book.getAuthorName());
        if (existing.isPresent()) {
            throw new RuntimeException("This book is already exists by the author");
        }
        return bookRepository.save(book);
    }
    public Book getBookByID(String id){
        return bookRepository.findById(id).orElseThrow(() -> new RuntimeException("Book not found"));
    }
    public Book updateBook(String id,Book updateBook){
        Book existingBook=bookRepository.findById(id).orElseThrow(()-> new RuntimeException("Book not Found"));
        existingBook.setBookName(updateBook.getBookName());
        existingBook.setAuthorMail(updateBook.getAuthorMail());
        existingBook.setPublisher(updateBook.getPublisher());
        existingBook.setDescription(updateBook.getDescription());
        existingBook.setPrice(updateBook.getPrice());
        return bookRepository.save(existingBook);
    }
    public void deleteBook(String id){
        if(!bookRepository.existsById(id))
        {
            throw new RuntimeException("Book not found");
        }
        bookRepository.deleteById(id);
    }
}
