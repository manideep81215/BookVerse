package com.lib.library.Repository;

import com.lib.library.Entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

    @Repository
    public interface BookRepository extends JpaRepository<Book, Long> {

        // Find book by ISBN
        Optional<Book> findByIsbn(String isbn);

        // Find books by author
        List<Book> findByAuthor(String author);

        // Find available books
        List<Book> findByAvailableTrue();
    }


