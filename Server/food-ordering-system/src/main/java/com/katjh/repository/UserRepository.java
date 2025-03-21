package com.katjh.repository;

import com.katjh.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Find user by email
     * @param username
     * @return
     */
    public User findByEmail(String username);
}
