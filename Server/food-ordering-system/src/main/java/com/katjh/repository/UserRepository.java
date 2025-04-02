package com.katjh.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.katjh.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Find user by email
     *
     * @param username
     * @return
     */
    public User findByEmail(String username);
}
