package com.lib.library.DTO;

import lombok.Data;

@Data
public class BorrowRequest {
    private Long userId;
    private Long bookId;
}
