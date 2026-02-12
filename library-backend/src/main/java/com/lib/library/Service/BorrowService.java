package com.lib.library.Service;


import com.lib.library.Entity.Book;
import com.lib.library.Entity.Borrow;
import com.lib.library.Entity.User;
import com.lib.library.Repository.BookRepository;
import com.lib.library.Repository.BorrowRepository;
import com.lib.library.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BorrowService {

    private final BorrowRepository borrowRepository;

    private final BookRepository bookRepository;
    private final UserRepository userRepository;


    public Borrow borrowBook(Long userId, Long bookId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Book not found"));

        if (!Boolean.TRUE.equals(book.getAvailable())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Book is already borrowed");
        }

        Borrow borrow = Borrow.builder()
                .user(user)
                .book(book)
                .borrowDate(LocalDate.now())
                .returned(false)
                .build();

        book.setAvailable(false);
        bookRepository.save(book);

        return borrowRepository.save(borrow);
    }


    public void returnBook(Long borrowId) {

        Borrow borrow = borrowRepository.findById(borrowId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Borrow record not found"));

        if (borrow.isReturned()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Book already returned");
        }

        borrow.setReturned(true);
        borrow.setReturnDate(LocalDate.now());

        Book book = borrow.getBook();
        book.setAvailable(true);

        bookRepository.save(book);
        borrowRepository.save(borrow);
    }


    public List<Borrow> getAllBorrows() {
        return borrowRepository.findAll();
    }


    public Borrow createBorrow(Borrow borrow) {
        borrow.getBook().setAvailable(false);
        return borrowRepository.save(borrow);
    }
}


