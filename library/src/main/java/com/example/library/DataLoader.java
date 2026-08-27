package com.example.library;

import com.example.library.entity.Book;
import com.example.library.entity.User;
import com.example.library.repository.BookRepository;
import com.example.library.repository.UserRepository;
import com.example.library.util.PasswordUtil;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner initData(UserRepository userRepo, BookRepository bookRepo) {
        return args -> {
            // 1. Initialize default admin if not present
            if (userRepo.findByUsername("admin").isEmpty()) {
                User admin = new User();
                admin.setUsername("admin");
                admin.setPassword(PasswordUtil.hashPassword("admin123"));
                admin.setRole("ADMIN");
                userRepo.save(admin);
            }

            // 2. Initialize categorized sample books if database has fewer than 50 books
            if (bookRepo.count() < 50) {
                List<Book> sampleBooks = new ArrayList<>();

                // Computer Science & IT
                sampleBooks.add(createBook("Clean Code: A Handbook of Agile Software Craftsmanship", "Robert C. Martin", 5, "Computer Science & IT"));
                sampleBooks.add(createBook("The Pragmatic Programmer: Your Journey To Mastery", "Andrew Hunt & David Thomas", 4, "Computer Science & IT"));
                sampleBooks.add(createBook("Introduction to Algorithms (4th Edition)", "Thomas H. Cormen, Charles E. Leiserson", 6, "Computer Science & IT"));
                sampleBooks.add(createBook("Design Patterns: Elements of Reusable Object-Oriented Software", "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides", 4, "Computer Science & IT"));
                sampleBooks.add(createBook("Structure and Interpretation of Computer Programs", "Harold Abelson & Gerald Jay Sussman", 3, "Computer Science & IT"));
                sampleBooks.add(createBook("Artificial Intelligence: A Modern Approach", "Stuart Russell & Peter Norvig", 5, "Computer Science & IT"));
                sampleBooks.add(createBook("Python Crash Course: A Hands-On, Project-Based Introduction", "Eric Matthes", 7, "Computer Science & IT"));
                sampleBooks.add(createBook("Java: The Complete Reference (12th Edition)", "Herbert Schildt", 6, "Computer Science & IT"));
                sampleBooks.add(createBook("Head First Design Patterns", "Eric Freeman & Elisabeth Robson", 5, "Computer Science & IT"));
                sampleBooks.add(createBook("You Don't Know JS: Scope & Closures", "Kyle Simpson", 4, "Computer Science & IT"));
                sampleBooks.add(createBook("Cracking the Coding Interview: 189 Programming Questions", "Gayle Laakmann McDowell", 8, "Computer Science & IT"));
                sampleBooks.add(createBook("Database System Concepts (7th Edition)", "Abraham Silberschatz, Henry F. Korth", 5, "Computer Science & IT"));
                sampleBooks.add(createBook("Computer Networking: A Top-Down Approach", "James F. Kurose & Keith W. Ross", 4, "Computer Science & IT"));
                sampleBooks.add(createBook("Operating System Concepts (10th Edition)", "Abraham Silberschatz, Peter B. Galvin", 5, "Computer Science & IT"));
                sampleBooks.add(createBook("Grokking Algorithms: An Illustrated Guide", "Aditya Bhargava", 6, "Computer Science & IT"));
                sampleBooks.add(createBook("The C Programming Language (2nd Edition)", "Brian W. Kernighan & Dennis M. Ritchie", 4, "Computer Science & IT"));
                sampleBooks.add(createBook("Clean Architecture: A Craftsman's Guide to Software Structure", "Robert C. Martin", 5, "Computer Science & IT"));
                sampleBooks.add(createBook("Refactoring: Improving the Design of Existing Code", "Martin Fowler", 4, "Computer Science & IT"));
                sampleBooks.add(createBook("Domain-Driven Design: Tackling Complexity in the Heart of Software", "Eric Evans", 3, "Computer Science & IT"));
                sampleBooks.add(createBook("Designing Data-Intensive Applications", "Martin Kleppmann", 6, "Computer Science & IT"));
                sampleBooks.add(createBook("Site Reliability Engineering: How Google Runs Production Systems", "Betsy Beyer, Chris Jones, Jennifer Petoff", 4, "Computer Science & IT"));
                sampleBooks.add(createBook("Continuous Delivery: Reliable Software Releases", "Jez Humble & David Farley", 4, "Computer Science & IT"));
                sampleBooks.add(createBook("The Phoenix Project: A Novel about DevOps", "Gene Kim, Kevin Behr, George Spafford", 5, "Computer Science & IT"));
                sampleBooks.add(createBook("Software Engineering at Google", "Titus Winters, Tom Manshreck, Hyrum Wright", 5, "Computer Science & IT"));
                sampleBooks.add(createBook("Accelerate: Building High Performing Technology Organizations", "Nicole Forsgren, Jez Humble, Gene Kim", 4, "Computer Science & IT"));

                // Mathematics
                sampleBooks.add(createBook("Calculus: Early Transcendentals", "James Stewart", 6, "Mathematics"));
                sampleBooks.add(createBook("Linear Algebra and Its Applications", "Gilbert Strang", 5, "Mathematics"));
                sampleBooks.add(createBook("Discrete Mathematics and Its Applications", "Kenneth H. Rosen", 6, "Mathematics"));
                sampleBooks.add(createBook("Introduction to Probability and Statistics", "William Mendenhall", 5, "Mathematics"));
                sampleBooks.add(createBook("The Joy of x: A Guided Tour of Math", "Steven Strogatz", 4, "Mathematics"));

                // Science & Nature
                sampleBooks.add(createBook("A Brief History of Time", "Stephen Hawking", 5, "Science & Nature"));
                sampleBooks.add(createBook("Cosmos", "Carl Sagan", 4, "Science & Nature"));
                sampleBooks.add(createBook("The Selfish Gene", "Richard Dawkins", 4, "Science & Nature"));
                sampleBooks.add(createBook("Astrophysics for People in a Hurry", "Neil deGrasse Tyson", 6, "Science & Nature"));
                sampleBooks.add(createBook("The Gene: An Intimate History", "Siddhartha Mukherjee", 5, "Science & Nature"));

                // Literature & Fiction
                sampleBooks.add(createBook("To Kill a Mockingbird", "Harper Lee", 5, "Literature & Fiction"));
                sampleBooks.add(createBook("1984", "George Orwell", 6, "Literature & Fiction"));
                sampleBooks.add(createBook("The Great Gatsby", "F. Scott Fitzgerald", 4, "Literature & Fiction"));
                sampleBooks.add(createBook("Pride and Prejudice", "Jane Austen", 5, "Literature & Fiction"));
                sampleBooks.add(createBook("The Hobbit", "J.R.R. Tolkien", 7, "Literature & Fiction"));
                sampleBooks.add(createBook("The Lord of the Rings: The Fellowship of the Ring", "J.R.R. Tolkien", 6, "Literature & Fiction"));
                sampleBooks.add(createBook("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 8, "Literature & Fiction"));
                sampleBooks.add(createBook("The Catcher in the Rye", "J.D. Salinger", 4, "Literature & Fiction"));
                sampleBooks.add(createBook("Brave New World", "Aldous Huxley", 5, "Literature & Fiction"));
                sampleBooks.add(createBook("The Alchemist", "Paulo Coelho", 8, "Literature & Fiction"));
                sampleBooks.add(createBook("Dune", "Frank Herbert", 6, "Literature & Fiction"));
                sampleBooks.add(createBook("Foundation", "Isaac Asimov", 5, "Literature & Fiction"));

                // Self-Help & Psychology
                sampleBooks.add(createBook("Atomic Habits: An Easy & Proven Way to Build Good Habits", "James Clear", 8, "Self-Help & Psychology"));
                sampleBooks.add(createBook("Thinking, Fast and Slow", "Daniel Kahneman", 5, "Self-Help & Psychology"));
                sampleBooks.add(createBook("Deep Work: Rules for Focused Success", "Cal Newport", 6, "Self-Help & Psychology"));
                sampleBooks.add(createBook("The Psychology of Money", "Morgan Housel", 7, "Self-Help & Psychology"));
                sampleBooks.add(createBook("Man's Search for Meaning", "Viktor E. Frankl", 5, "Self-Help & Psychology"));

                // Business & Economics
                sampleBooks.add(createBook("The Lean Startup", "Eric Ries", 5, "Business & Economics"));
                sampleBooks.add(createBook("Zero to One: Notes on Startups", "Peter Thiel", 6, "Business & Economics"));
                sampleBooks.add(createBook("Good to Great", "Jim Collins", 4, "Business & Economics"));
                sampleBooks.add(createBook("The Intelligent Investor", "Benjamin Graham", 6, "Business & Economics"));

                // History & Philosophy
                sampleBooks.add(createBook("Sapiens: A Brief History of Humankind", "Yuval Noah Harari", 6, "History & Philosophy"));
                sampleBooks.add(createBook("The Art of War", "Sun Tzu", 5, "History & Philosophy"));
                sampleBooks.add(createBook("Meditations", "Marcus Aurelius", 6, "History & Philosophy"));

                for (Book b : sampleBooks) {
                    if (bookRepo.findByTitleIgnoreCase(b.getTitle()).isEmpty()) {
                        bookRepo.save(b);
                    }
                }
            }
        };
    }

    private Book createBook(String title, String author, int copies, String category) {
        Book b = new Book();
        b.setTitle(title);
        b.setAuthor(author);
        b.setTotalCopies(copies);
        b.setAvailableCopies(copies);
        b.setCategory(category);
        return b;
    }
}
