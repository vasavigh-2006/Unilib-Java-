package com.example.library.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.example.library.dto.LibraryStatsDto;
import com.example.library.entity.Book;
import com.example.library.service.BookService;

@RestController
@RequestMapping("/books")
@CrossOrigin(origins = "*")
public class BookController {

    private final BookService service;

    public BookController(BookService service) {
        this.service = service;
    }

    @PostMapping("/add")
    public ResponseEntity<Book> add(@RequestBody Book book,
                                    @RequestParam(required = false) String role) {
        Book saved = service.addBook(book);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Book> update(@PathVariable Long id,
                                       @RequestBody Book book,
                                       @RequestParam(required = false) String role) {
        Book updated = service.updateBook(id, book);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id,
                                    @RequestParam(required = false) String role) {
        service.deleteBook(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Book deleted successfully");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Book>> all() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Book>> search(@RequestParam(required = false, defaultValue = "") String query) {
        return ResponseEntity.ok(service.searchBooks(query));
    }

    @GetMapping("/stats")
    public ResponseEntity<LibraryStatsDto> stats() {
        return ResponseEntity.ok(service.getStats());
    }
}
