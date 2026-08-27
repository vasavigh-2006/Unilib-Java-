package com.example.library.controller;

import com.example.library.entity.Borrow;
import com.example.library.service.BorrowService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/borrow")
@CrossOrigin(origins = "*")
public class BorrowController {

    private final BorrowService service;

    public BorrowController(BorrowService service) {
        this.service = service;
    }

    @PostMapping("/take")
    public ResponseEntity<Borrow> borrow(@RequestParam Long studentId,
                                         @RequestParam Long bookId,
                                         @RequestParam(required = false) String role) {
        Borrow borrow = service.borrowBookEntity(studentId, bookId);
        return ResponseEntity.ok(borrow);
    }

    @PostMapping("/return/{borrowId}")
    public ResponseEntity<Borrow> returnBook(@PathVariable Long borrowId,
                                             @RequestParam(required = false) String role) {
        Borrow borrow = service.returnBookEntity(borrowId);
        return ResponseEntity.ok(borrow);
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Borrow>> getBorrowsByStudent(@PathVariable Long studentId,
                                                           @RequestParam(required = false) String role) {
        List<Borrow> borrows = service.getBorrowsByStudentIdEntity(studentId);
        return ResponseEntity.ok(borrows);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Borrow>> getAllBorrows() {
        List<Borrow> borrows = service.getAllBorrows();
        return ResponseEntity.ok(borrows);
    }
}
