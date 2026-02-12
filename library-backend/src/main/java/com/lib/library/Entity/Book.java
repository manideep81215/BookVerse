package com.lib.library.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "books")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String author;

    @Column(unique = true, nullable = false)
    private String isbn;

    @Builder.Default
    @Column(nullable = false)
    private Boolean available = true;

    @PrePersist
    public void prePersist() {
        if (available == null) {
            available = true;
        }
    }
}


