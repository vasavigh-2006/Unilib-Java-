package com.example.library.repository;

import com.example.library.entity.Borrow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface BorrowRepository extends JpaRepository<Borrow, Long> {

    @Query("SELECT b FROM Borrow b ORDER BY b.borrowDate DESC, b.id DESC")
    List<Borrow> findAllOrdered();

    @Query("SELECT b FROM Borrow b WHERE b.book.id = :bookId")
    List<Borrow> findByBookId(@Param("bookId") Long bookId);

    @Query("SELECT b FROM Borrow b WHERE b.book.id = :bookId AND b.returned = false")
    List<Borrow> findByBookIdAndReturnedFalse(@Param("bookId") Long bookId);

    @Query("SELECT b FROM Borrow b WHERE b.student.id = :studentId ORDER BY b.borrowDate DESC, b.id DESC")
    List<Borrow> findByStudentId(@Param("studentId") Long studentId);

    @Query("SELECT b FROM Borrow b WHERE b.student.id = :studentId AND b.book.id = :bookId AND b.returned = false")
    Optional<Borrow> findActiveBorrowByStudentAndBook(@Param("studentId") Long studentId, @Param("bookId") Long bookId);

    @Query("SELECT COUNT(b) FROM Borrow b WHERE b.returned = false")
    long countActiveBorrows();

    @Query("SELECT COALESCE(SUM(b.fine), 0) FROM Borrow b WHERE b.returned = true")
    double sumFinesCollected();

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM borrow WHERE book_id = :bookId", nativeQuery = true)
    void deleteAllByBookId(@Param("bookId") Long bookId);
}