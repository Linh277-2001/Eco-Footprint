package com.example.kits2023_backend_v1.controller;

import com.example.kits2023_backend_v1.model.User;
import com.example.kits2023_backend_v1.response.GenericApiResponse;
import com.example.kits2023_backend_v1.service.UserSerVice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")

public class UserController {
    @Autowired
    public UserSerVice userSerVice;

    @PutMapping("/{id}")
    public ResponseEntity<?> changeAvatar(@PathVariable int id, @RequestParam("file") MultipartFile file) {
        return userSerVice.changeAvatar(id, file);
    }

    @PutMapping("/changePassword/{id}")
    public ResponseEntity<GenericApiResponse<User>> changePassWord(@PathVariable int id, @RequestParam String newPassWord) {
        return userSerVice.changePassword(id, newPassWord);
    }

    @GetMapping("/{id}")
    public ResponseEntity<String> checkPassword(@PathVariable int id, @RequestParam String password) {
        return userSerVice.checkPassword(id, password);
    }

    @GetMapping("/rank3/{date}")
    public List<User> getRank3(@PathVariable String date) {
        return userSerVice.getRank3(date);
    }

    @PutMapping("/updateInfo")
    public ResponseEntity<GenericApiResponse<User>> updateInfo(@PathVariable int id, @RequestParam("name") String name, @RequestParam("file") MultipartFile file){
        return userSerVice.updateInfo(id,name,file);
    }

}
