package com.example.kits2023_backend_v1.controller;


import com.example.kits2023_backend_v1.dto.LoginRequest;
import com.example.kits2023_backend_v1.dto.SignupRequest;
import com.example.kits2023_backend_v1.jwts.JwtUtils;
import com.example.kits2023_backend_v1.model.ERole;
import com.example.kits2023_backend_v1.model.Role;
import com.example.kits2023_backend_v1.model.User;
import com.example.kits2023_backend_v1.repository.RoleRepository;
import com.example.kits2023_backend_v1.repository.UserRepository;
import com.example.kits2023_backend_v1.response.JwtResponse;
import com.example.kits2023_backend_v1.response.MessageResponse;
import com.example.kits2023_backend_v1.service.IImageService;
import com.example.kits2023_backend_v1.service.ImageService;
import com.example.kits2023_backend_v1.service.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")

public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        try{
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);

            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            List<String> roles = userDetails.getAuthorities().stream()
                    .map(item -> item.getAuthority())
                    .collect(Collectors.toList());

            return ResponseEntity.ok(new JwtResponse(jwt,
                            userDetails.getId(),
                            userDetails.getName(),
                            userDetails.getUsername(),
                            userDetails.getEmail(),
                            roles, userDetails.getAvatar(),
                            userDetails.isStatus()
                    )

            );
        }
        catch (AuthenticationException e) {
            // Xử lý khi đăng nhập thất bại
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body( "Login failed");
        }


    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }


//            String imageUrl = imgservice.create(signUpRequest.getFile());
            signUpRequest.setAvatar("https://storage.googleapis.com/eco-footprint-5cae2.appspot.com/avatar.png");

            // Create new user's account
            User user = new User(signUpRequest.getName(),
                    signUpRequest.getUsername(),
                    encoder.encode(signUpRequest.getPassword()),
                    signUpRequest.getEmail(),
                    signUpRequest.getAvatar(),
                    signUpRequest.isStatus()
            );

            Set<String> strRoles = signUpRequest.getRole();
            Set<Role> roles = new HashSet<>();

            if (strRoles == null) {
                Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                roles.add(userRole);
            } else {
                strRoles.forEach(role -> {
                    switch (role) {
                        case "admin":
                            Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                            roles.add(adminRole);

                            break;
                        default:
                            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                            roles.add(userRole);
                    }
                });
            }

            user.setRoles(roles);
            userRepository.save(user);

            return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}
