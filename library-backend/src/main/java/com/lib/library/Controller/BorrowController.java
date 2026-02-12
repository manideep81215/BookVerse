package com.lib.library.Controller;


import com.lib.library.DTO.BorrowRequest;
import com.lib.library.Entity.Borrow;
import com.lib.library.Service.BorrowService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

    @RestController
    @RequestMapping("/api/borrows")
    @RequiredArgsConstructor
    @CrossOrigin("*")
    public class BorrowController {

        private final BorrowService borrowService;


        @PostMapping({"", "/borrow"})
        public ResponseEntity<Borrow> borrowBook(@RequestBody BorrowRequest request) {

            if (request.getUserId() == null || request.getBookId() == null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "userId and bookId are required");
            }

            Borrow borrow = borrowService.borrowBook(
                    request.getUserId(),
                    request.getBookId()
            );

            return ResponseEntity.status(HttpStatus.CREATED).body(borrow);
        }





        // Return a Book
        @PutMapping("/return/{borrowId}")
        public ResponseEntity<String> returnBook(@PathVariable Long borrowId) {
            borrowService.returnBook(borrowId);
            return ResponseEntity.ok("Book returned successfully");
        }

        // Get All Borrow Records
        @GetMapping
        public ResponseEntity<List<Borrow>> getAllBorrows() {
            return ResponseEntity.ok(borrowService.getAllBorrows());
        }
    }


