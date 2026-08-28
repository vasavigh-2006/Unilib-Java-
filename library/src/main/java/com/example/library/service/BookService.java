package com.example.library.service;

import com.example.library.dto.LibraryStatsDto;
import com.example.library.entity.Book;
import com.example.library.entity.Borrow;
import com.example.library.exception.BadRequestException;
import com.example.library.exception.ResourceNotFoundException;
import com.example.library.repository.BookRepository;
import com.example.library.repository.BorrowRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class BookService {

    private final BookRepository repo;
    private final BorrowRepository borrowRepo;

    public BookService(BookRepository repo, BorrowRepository borrowRepo) {
        this.repo = repo;
        this.borrowRepo = borrowRepo;
    }

    @Transactional
    public Book addBook(Book b) {
        if (b.getTitle() == null || b.getTitle().trim().isEmpty()) {
            throw new BadRequestException("Book title cannot be empty");
        }
        if (b.getAuthor() == null || b.getAuthor().trim().isEmpty()) {
            throw new BadRequestException("Author name cannot be empty");
        }
        if (b.getTotalCopies() <= 0) {
            throw new BadRequestException("Total copies must be at least 1");
        }

        b.setTitle(b.getTitle().trim());
        b.setAuthor(b.getAuthor().trim());
        b.setCategory(b.getCategory() != null && !b.getCategory().trim().isEmpty() ? b.getCategory().trim() : "General");
        b.setAvailableCopies(b.getTotalCopies());
        return repo.save(b);
    }

    @Transactional
    public Book updateBook(Long id, Book updated) {
        Book book = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with ID: " + id));

        if (updated.getTitle() == null || updated.getTitle().trim().isEmpty()) {
            throw new BadRequestException("Book title cannot be empty");
        }
        if (updated.getAuthor() == null || updated.getAuthor().trim().isEmpty()) {
            throw new BadRequestException("Author name cannot be empty");
        }
        if (updated.getTotalCopies() < 0) {
            throw new BadRequestException("Total copies cannot be negative");
        }

        int copiesDifference = updated.getTotalCopies() - book.getTotalCopies();
        int newAvailable = book.getAvailableCopies() + copiesDifference;

        if (newAvailable < 0) {
            throw new BadRequestException("Cannot reduce total copies below currently borrowed copies");
        }

        book.setTitle(updated.getTitle().trim());
        book.setAuthor(updated.getAuthor().trim());
        book.setCategory(updated.getCategory() != null && !updated.getCategory().trim().isEmpty() ? updated.getCategory().trim() : "General");
        book.setTotalCopies(updated.getTotalCopies());
        book.setAvailableCopies(newAvailable);

        return repo.save(book);
    }

    @Transactional
    public void deleteBook(Long id) {
        Book book = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with ID: " + id));

        List<Borrow> allBookBorrows = borrowRepo.findByBookId(id);
        long activeCount = allBookBorrows.stream()
                .filter(b -> b != null && !b.isReturned())
                .count();

        if (activeCount > 0) {
            throw new BadRequestException(
                "Cannot delete \"" + book.getTitle() + "\": There are " + activeCount +
                " active unreturned borrow(s). All copies must be returned first."
            );
        }

        if (!allBookBorrows.isEmpty()) {
            borrowRepo.deleteAllByBookId(id);
        }

        repo.delete(book);
    }

    @Transactional(readOnly = true)
    public List<Book> getAll() {
        return repo.findAll();
    }

    @Transactional(readOnly = true)
    public List<Book> searchBooks(String query) {
        if (query == null || query.trim().isEmpty()) {
            return repo.findAll();
        }
        return repo.searchBooks(query.trim());
    }

    @Transactional(readOnly = true)
    public LibraryStatsDto getStats() {
        List<Book> books = repo.findAll();
        long totalTitles = books.size();
        long totalCopies = books.stream().mapToLong(Book::getTotalCopies).sum();
        long availableCopies = books.stream().mapToLong(Book::getAvailableCopies).sum();

        List<Borrow> allBorrows = borrowRepo.findAll();
        long activeBorrows = allBorrows.stream().filter(b -> !b.isReturned()).count();
        
        LocalDate today = LocalDate.now();
        long overdueBorrows = allBorrows.stream()
                .filter(b -> !b.isReturned() && b.getBorrowDate() != null && ChronoUnit.DAYS.between(b.getBorrowDate(), today) > 7)
                .count();

        double totalFinesCollected = borrowRepo.sumFinesCollected();
        double pendingFinesDue = borrowRepo.sumPendingFines();

        return new LibraryStatsDto(
                totalTitles,
                totalCopies,
                availableCopies,
                activeBorrows,
                overdueBorrows,
                totalFinesCollected,
                pendingFinesDue
        );
    }
}
