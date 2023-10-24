package com.example.kits2023_backend_v1.controller;

import com.example.kits2023_backend_v1.model.Category;
import com.example.kits2023_backend_v1.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/category")

public class CategoryController {
    @Autowired
    private CategoryRepository categoryRepository;
    @GetMapping("/all")
    public List<Category> getAllCategory(){
        return categoryRepository.findAll();
    }
    @PostMapping
    public Category insertCategory(@RequestBody Category category){
        return categoryRepository.save(category);
    }
//    @DeleteMapping("{id}")
//    public void deleteCategory(@PathVariable int id){
//        categoryRepository.deleteById(id);
//    }
    @PutMapping("{id}")
    public Category updateCategory(@PathVariable int id, @RequestBody Category category){
        Category updateCategory=categoryRepository.findById(id).get();
        updateCategory.setName(category.getName());
        return categoryRepository.save(updateCategory);
    }
    @GetMapping("/count")
    public long countAllCategories(){
        return categoryRepository.count();
    }
}
