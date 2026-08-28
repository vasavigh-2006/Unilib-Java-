package com.example.library.service;

import com.example.library.entity.Book;
import com.example.library.entity.Borrow;
import com.example.library.entity.Student;
import com.example.library.exception.BadRequestException;
import com.example.library.exception.ResourceNotFoundException;
import com.example.library.repository.BookRepository;
import com.example.library.repository.BorrowRepository;
import com.example.library.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class BorrowService {

    private final BorrowRepository borrowRepo;
    private final BookRepository bookRepo;
    private final StudentRepository studentRepo;

    public BorrowService(BorrowRepository b,
                         BookRepository bk,
                         StudentRepository s) {
        this.borrowRepo = b;
        this.bookRepo = bk;
        this.studentRepo = s;
    }

    @Transactional
    public Borrow borrowBookEntity(Long studentId, Long bookId) {
        if (studentId == null || bookId == null) {
            throw new BadRequestException("Student ID and Book ID are required");
        }

        Student student = studentRepo.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with ID: " + studentId));

        Book book = bookRepo.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with ID: " + bookId));

        // Check if student already has an active borrow for this same book
        borrowRepo.findActiveBorrowByStudentAndBook(studentId, bookId).ifPresent(b -> {
            throw new BadRequestException("You have already borrowed a copy of \"" + book.getTitle() + "\". Please return it before borrowing again.");
        });

        if (book.getAvailableCopies() <= 0) {
            throw new BadRequestException("Sorry, no copies of \"" + book.getTitle() + "\" are currently available.");
        }

        // Atomic stock decrement
        book.setAvailableCopies(book.getAvailableCopies() - 1);
        bookRepo.save(book);

        Borrow borrow = new Borrow();
        borrow.setStudent(student);
        borrow.setBook(book);
        borrow.setBorrowDate(LocalDate.now());
        borrow.setReturned(false);
        borrow.setFine(0);
        borrow.setFinePaid(false);

        return borrowRepo.save(borrow);
    }

    @Transactional
    public Borrow returnBookEntity(Long borrowId) {
        if (borrowId == null) {
            throw new BadRequestException("Borrow ID is required");
        }

        Borrow borrow = borrowRepo.findById(borrowId)
                .orElseThrow(() -> new ResourceNotFoundException("Borrow record not found with ID: " + borrowId));

        if (borrow.isReturned()) {
            throw new BadRequestException("This book has already been returned.");
        }

        LocalDate today = LocalDate.now();
        long days = ChronoUnit.DAYS.between(borrow.getBorrowDate(), today);

        // 7 days allowed limit. Late fee = 10 currency units per day.
        double fine = 0;
        if (days > 7) {
            fine = (days - 7) * 10.0;
        }

        borrow.setFine(fine);
        borrow.setFinePaid(fine == 0);
        if (fine == 0) {
            borrow.setFinePaidDate(today);
        }
        borrow.setReturned(true);
        borrow.setReturnDate(today);

        Book book = borrow.getBook();
        if (book != null) {
            book.setAvailableCopies(Math.min(book.getTotalCopies(), book.getAvailableCopies() + 1));
            bookRepo.save(book);
        }

        return borrowRepo.save(borrow);
    }

    @Transactional
    public Borrow settleFineEntity(Long borrowId) {
        if (borrowId == null) {
            throw new BadRequestException("Borrow ID is required");
        }
        Borrow borrow = borrowRepo.findById(borrowId)
                .orElseThrow(() -> new ResourceNotFoundException("Borrow record not found with ID: " + borrowId));

        if (!borrow.isReturned()) {
            throw new BadRequestException("Book must be returned before fine can be settled.");
        }
        if (borrow.getFine() <= 0) {
            throw new BadRequestException("No fine is due for this record.");
        }
        if (borrow.isFinePaid()) {
            throw new BadRequestException("Fine has already been marked as paid.");
        }

        borrow.setFinePaid(true);
        borrow.setFinePaidDate(LocalDate.now());
        return borrowRepo.save(borrow);
    }

    @Transactional(readOnly = true)
    public List<Borrow> getBorrowsByStudentIdEntity(Long studentId) {
        if (studentId == null) {
            throw new BadRequestException("Student ID is required");
        }
        return borrowRepo.findByStudentId(studentId);
    }

    @Transactional(readOnly = true)
    public List<Borrow> getAllBorrows() {
        return borrowRepo.findAllOrdered();
    }
}
