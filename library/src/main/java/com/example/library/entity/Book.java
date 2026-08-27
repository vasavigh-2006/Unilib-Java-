package com.example.library.entity;

import jakarta.persistence.*;

@Entity
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private int totalCopies;
    private int availableCopies;
    private String author;
    private String category; // e.g. "Computer Science", "Mathematics", "Science", "Literature", etc.

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public int getAvailableCopies() { return availableCopies; }
    public int getTotalCopies() { return totalCopies; }
    public String getAuthor() { return author; }
    public String getCategory() { return category != null && !category.trim().isEmpty() ? category : "General"; }

    public void setId(Long id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setAvailableCopies(int availableCopies) {
        this.availableCopies = availableCopies;
    }
    public void setTotalCopies(int totalCopies) {
        this.totalCopies = totalCopies;
    }
    public void setAuthor(String author) { this.author = author; }
    public void setCategory(String category) { this.category = category; }
}
