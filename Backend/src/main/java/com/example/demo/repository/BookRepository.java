package com.example.demo.repository;
import com.example.demo.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends MongoRepository<Book,String> {
        Optional<Book> findByBookNameAndAuthorNameStartingWith(String bookName,String authorName);

        Page<Book> findByBookNameContainingIgnoreCase(String searchTerm, Pageable pageable);
}
