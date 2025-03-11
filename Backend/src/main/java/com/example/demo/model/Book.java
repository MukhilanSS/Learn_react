package com.example.demo.model;
import lombok.Data;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
@Document(collection="books")
//@Data
public class Book {
    @Id
    public String id;

    private String bookName;
    private String authorName;
    private String authorMail;
    private String publisher;
    private String description;
    private Double price;
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

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public String getAuthorMail() {
        return authorMail;
    }

    public void setAuthorMail(String authorMail) {
        this.authorMail = authorMail;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}