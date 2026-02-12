package com.lib.library.Repository;


import com.lib.library.Entity.Borrow;
import com.lib.library.Entity.Book;
import com.lib.library.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

    @Repository
    public interface BorrowRepository extends JpaRepository<Borrow, Long> {

        // Find all borrow records of a particular user
        List<Borrow> findByUser(User user);

        // Find all borrow records of a particular book
        List<Borrow> findByBook(Book book);

        // Find active borrow records (not returned yet)
        List<Borrow> findByReturnedFalse();

        // Check if a specific book is currently borrowed
        boolean existsByBookAndReturnedFalse(Book book);
    }


