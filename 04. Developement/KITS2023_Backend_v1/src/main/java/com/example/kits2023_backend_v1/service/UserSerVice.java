package com.example.kits2023_backend_v1.service;


import com.example.kits2023_backend_v1.model.ERole;
import com.example.kits2023_backend_v1.model.Role;
import com.example.kits2023_backend_v1.model.User;
import com.example.kits2023_backend_v1.repository.RoleRepository;
import com.example.kits2023_backend_v1.repository.UserRepository;
import com.example.kits2023_backend_v1.response.GenericApiResponse;
import com.example.kits2023_backend_v1.response.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
public class UserSerVice {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    ImageService imageService;

    @Autowired
    PasswordEncoder encoder;
//    public User register(User user){
//        Optional<User> user1=userRepository.findByUsername(user.getUsername());
//        if(user1.isPresent()) return null;
//        Optional<User> user2=userRepository.findByEmail(user.getEmail());
//        if(user2.isPresent()) return null;
//        return userRepository.save(user);
//    }
//    public User changePassword(String username, String password){
//        Optional<User> user1=userRepository.findByUsername(username);
//        if(user1.isPresent()){
//            User user=user1.get();
//            user.setPassword(password);
//            return userRepository.save(user);
//        }
//        return null;
//    }


    public List<User> getAllUser(){
        return userRepository.findAll();
    }
    public Optional<User> getUserById(int id){
        return userRepository.findById(id);
    }
    public ResponseEntity<GenericApiResponse<User>> lockUserById(int id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setStatus(false);
            userRepository.save(user);
//            Optional<User> updateUser = userRepository.findById(id);
            GenericApiResponse<User> apiResponse = new GenericApiResponse<>("User with ID " + id + " has been locked.","200" ,user);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
//                    ResponseEntity.ok("User with ID " + id + " has been locked.");
        } else {
            GenericApiResponse<User> apiResponse = new GenericApiResponse<>("User with ID " + id + " does not exist.", "404", null);
            return new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
//            return ResponseEntity.badRequest().body("User with ID " + id + " does not exist.");
        }
    }
    public ResponseEntity<GenericApiResponse<User>> unLockUserById(int id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setStatus(true);
            userRepository.save(user);
            GenericApiResponse<User> apiResponse = new GenericApiResponse<>("User with ID " + id + " has been unlocked.","200" ,user);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
//            return ResponseEntity.ok("User with ID " + id + " has been unlocked.");
        } else {
            GenericApiResponse<User> apiResponse = new GenericApiResponse<>("User with ID " + id + " does not exist.", "404", null);
            return new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
//            return ResponseEntity.badRequest().body("User with ID " + id + " does not exist.");
        }
    }

    public ResponseEntity<String> addRoleToUser(int userId, String role) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            // Kiểm tra xem quyền đã tồn tại trong danh sách quyền của người dùng chưa
            switch (role) {
                case "admin":
                    Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    if (!user.getRoles().contains(adminRole)) {
                        user.getRoles().add(adminRole);
                        userRepository.save(user);
                        return ResponseEntity.ok("Role 'admin' has been added to the user with ID: " + userId);
                    }
                    break;
                default:
                    Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    if (!user.getRoles().contains(userRole)) {
                        user.getRoles().add(userRole);
                        userRepository.save(user);
                        return ResponseEntity.ok("Role 'user' has been added to the user with ID: " + userId);
                    }
            }
            return ResponseEntity.badRequest().body("User already has the role: " + role);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    public ResponseEntity<String> removeRoleFromUser(int userId, String role) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            // Kiểm tra xem quyền đã tồn tại trong danh sách quyền của người dùng chưa
            switch (role) {
                case "admin":
                    Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    if (user.getRoles().contains(adminRole)) {
                        user.getRoles().remove(adminRole);
                        userRepository.save(user);

                        return ResponseEntity.ok("Role 'admin' has been removed from the user with ID: " + userId);
                    }
                    break;
                default:
                    Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    if (user.getRoles().contains(userRole)) {
//                        user.getRoles().remove(userRole);
//                        userRepository.save(user);
                        return ResponseEntity.ok("Role 'user' is default role you can not delete this role");
                    }
            }
            return ResponseEntity.badRequest().body("User does not have the role: " + role);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<?> changeAvatar(int id, MultipartFile file) {
        Optional<User> updatedUser = userRepository.findById(id);
        if (updatedUser.isPresent()) {
            User user = updatedUser.get();
            String imageURL = imageService.create(file);
            user.setAvatar(imageURL);
            userRepository.save(user);

            return ResponseEntity.ok(new MessageResponse("Avatar changed successfully!"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("User not found"));
        }
    }
    public ResponseEntity<GenericApiResponse<User>> getUserByUserName(String username) {
        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
                GenericApiResponse<User> apiResponse = new GenericApiResponse<>("User Found", "400", user);
                return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);

        } else {
            GenericApiResponse<User> apiResponse = new GenericApiResponse<>("User with username" + username + " does not exist.", "404", null);
            return new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
        }
    }
    public ResponseEntity<GenericApiResponse<User>> changePassword(int id, String newPassWord) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            // Check if the old password matches the stored password
            if (encoder.matches(newPassWord, user.getPassword())) {
                // New password matches old password
                GenericApiResponse<User> apiResponse = new GenericApiResponse<>("New password should be different from the old password.", "400", user);
                return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
            } else {
                // Update the password and save the user
                user.setPassword(encoder.encode(newPassWord));
                userRepository.save(user);
                GenericApiResponse<User> apiResponse = new GenericApiResponse<>("The password has been changed", "200", user);
                return new ResponseEntity<>(apiResponse, HttpStatus.OK);
            }
        } else {
            GenericApiResponse<User> apiResponse = new GenericApiResponse<>("User with ID " + id + " does not exist.", "404", null);
            return new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<String> checkPassword(int id, String password){
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            // Check if the provided password matches the stored strong password
            if (encoder.matches(password, user.getPassword())) {
                // Passwords match
                return ResponseEntity.ok("Password is correct.");
            } else {
                // Passwords do not match
                return ResponseEntity.badRequest().body("Password is incorrect.");
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    public long countUser(){
        return userRepository.countUser();
    }
    public List<User> getListUser(){
        return userRepository.getListUser();
    }
    public List<User> getRank3(String date){
        return userRepository.getRank3User(date);
    }

    public ResponseEntity<GenericApiResponse<User>> updateInfo(int id, String name,MultipartFile file) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            // Check if the old password matches the stored password
                // Update the password and save the user
                String avatar= imageService.create(file);
                user.setName(name);
                user.setAvatar(avatar);
                userRepository.save(user);
                GenericApiResponse<User> apiResponse = new GenericApiResponse<>("Update Successfully", "200", user);
                return new ResponseEntity<>(apiResponse, HttpStatus.OK);
            }
        else {
            GenericApiResponse<User> apiResponse = new GenericApiResponse<>("User with ID " + id + " does not exist.", "404", null);
            return new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
        }
    }
}
