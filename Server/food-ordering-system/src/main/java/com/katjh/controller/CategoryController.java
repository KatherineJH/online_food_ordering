package com.katjh.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.katjh.model.Category;
import com.katjh.model.User;
import com.katjh.service.CategoryService;
import com.katjh.service.user.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;
    private final UserService userService;

    @PostMapping("/admin/category")
    public ResponseEntity<Category> createCategory(
            @RequestBody Category category, @RequestHeader("Authorization") String token)
            throws Exception {
        User user = userService.findUserByJwtToken(token);

        Category createdCategory = categoryService.createCategory(category.getName(), user.getId());

        return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
    }

    @GetMapping("/category/restaurant/{id}")
    public ResponseEntity<List<Category>> getRestaurantCategory(
            @RequestHeader("Authorization") String token, @PathVariable Long id) throws Exception {
        User user = userService.findUserByJwtToken(token);

        List<Category> categories = categoryService.findCategoryByRestaurantId(id);

        return new ResponseEntity<>(categories, HttpStatus.OK);
    }
}
