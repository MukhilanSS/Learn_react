package com.example.demo.model;
import lombok.Data;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection="books")
@Data
public class Book {
    @Id
    public String id;

    public String bookName;
    public String authorName;
    public String authorMail;
    public String publisher;
    public String description;
    public Double price;
    public Book() {
        super();
    }
    public Book(String bookName, String authorName, String authorMail, String publisher, String description, Double price) {
        this.bookName = bookName;
        this.authorName = authorName;
        this.authorMail = authorMail;
        this.publisher = publisher;
        this.description = description;
        this.price = price;
    }
}