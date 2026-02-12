package com.lib.library.Repository;

import com.lib.library.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;



import com.lib.library.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

    @Repository
    public interface UserRepository extends JpaRepository<User, Long> {

        // Find user by email (for validation / login purpose)
        Optional<User> findByEmail(String email);

        // Check if email already exists
        boolean existsByEmail(String email);

        // Find users by role (ADMIN / STUDENT)
        List<User> findByRole(String role);
    }


