package com.katjh.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.katjh.model.User;
import com.katjh.service.user.UserService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    /**
     * Get user profile by jwt token
     *
     * @param token
     * @return
     * @throws Exception
     */
    @GetMapping("/profile")
    public ResponseEntity<User> findUserByJwtToken(@RequestHeader("Authorization") String token)
            throws Exception {

        User user = userService.findUserByJwtToken(token);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}
