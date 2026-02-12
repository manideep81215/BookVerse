package com.lib.library.Service;

import com.lib.library.Entity.Book;
import com.lib.library.Repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;

    public Book addBook(Book book) {
        if (bookRepository.findByIsbn(book.getIsbn()).isPresent()) {
            throw new RuntimeException("Book with this ISBN already exists");
        }
        if (book.getAvailable() == null) {
            book.setAvailable(true);
        }
        return bookRepository.save(book);
    }

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Book getBookById(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));
    }

    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }

    public Book updateBook(Long id, Book bookDetails) {
        Book existingBook = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        bookRepository.findByIsbn(bookDetails.getIsbn())
                .ifPresent(b -> {
                    if (!b.getId().equals(id)) {
                        throw new RuntimeException("Another book with this ISBN already exists");
                    }
                });

        existingBook.setTitle(bookDetails.getTitle());
        existingBook.setAuthor(bookDetails.getAuthor());
        existingBook.setIsbn(bookDetails.getIsbn());
        if (bookDetails.getAvailable() != null) {
            existingBook.setAvailable(bookDetails.getAvailable());
        }

        return bookRepository.save(existingBook);
    }
}
