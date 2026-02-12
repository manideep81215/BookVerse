package com.lib.library.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.time.LocalDate;



import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

    @Entity
    @Table(name = "borrows")
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public class Borrow {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(nullable = false)
        private LocalDate borrowDate;

        private LocalDate returnDate;

        @Column(nullable = false)
        private boolean returned = false;

        // Many borrow records can belong to one Book
        @ManyToOne
        @JoinColumn(name = "book_id", nullable = false)
        private Book book;

        // Many borrow records can belong to one User
        @ManyToOne
        @JoinColumn(name = "user_id", nullable = false)
        private User user;
    }


