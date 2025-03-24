package com.katjh.service.user;

import com.katjh.model.User;

public interface UserService {

    public User findUserByJwtToken(String token) throws Exception;

    public User findUserByEmail(String email) throws Exception;
}
