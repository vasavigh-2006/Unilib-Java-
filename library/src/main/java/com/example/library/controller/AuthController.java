package com.example.library.controller;

import com.example.library.dto.ChangePasswordRequest;
import com.example.library.entity.Student;
import com.example.library.entity.User;
import com.example.library.exception.BadRequestException;
import com.example.library.repository.StudentRepository;
import com.example.library.repository.UserRepository;
import com.example.library.util.PasswordUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserRepository repo;
    private final StudentRepository studentRepo;

    public AuthController(UserRepository repo, StudentRepository studentRepo) {
        this.repo = repo;
        this.studentRepo = studentRepo;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user,
                                      @RequestParam(required = false) String role) {
        if (user.getUsername() == null || user.getUsername().trim().isEmpty()) {
            throw new BadRequestException("Username is required");
        }
        if (user.getPassword() == null || user.getPassword().length() < 4) {
            throw new BadRequestException("Password must be at least 4 characters");
        }

        String targetRole = user.getRole() != null ? user.getRole().toUpperCase() : (role != null ? role.toUpperCase() : "STUDENT");
        if (!targetRole.equals("ADMIN") && !targetRole.equals("STUDENT")) {
            throw new BadRequestException("Role must be either ADMIN or STUDENT");
        }

        String username = user.getUsername().trim();
        if (repo.findByUsername(username).isPresent()) {
            throw new BadRequestException("Username \"" + username + "\" already exists");
        }

        user.setUsername(username);
        user.setPassword(PasswordUtil.hashPassword(user.getPassword()));
        user.setRole(targetRole);

        if (targetRole.equals("STUDENT")) {
            Student s = user.getStudent() != null ? user.getStudent() : new Student();
            if (s.getName() == null || s.getName().trim().isEmpty()) {
                s.setName(username);
            }
            studentRepo.save(s);
            user.setStudent(s);
        }

        User savedUser = repo.save(user);
        savedUser.setPassword(null);
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginUser) {
        if (loginUser.getUsername() == null || loginUser.getUsername().trim().isEmpty()) {
            throw new BadRequestException("Username cannot be empty");
        }
        if (loginUser.getPassword() == null || loginUser.getPassword().isEmpty()) {
            throw new BadRequestException("Password cannot be empty");
        }

        User user = repo.findByUsername(loginUser.getUsername().trim())
                .orElseThrow(() -> new BadRequestException("Invalid username or password"));

        boolean isValid = PasswordUtil.verifyPassword(loginUser.getPassword(), user.getPassword());
        if (!isValid) {
            throw new BadRequestException("Invalid username or password");
        }

        // Auto-upgrade legacy plaintext passwords to salted hash
        if (!user.getPassword().startsWith("$SHA256$")) {
            user.setPassword(PasswordUtil.hashPassword(loginUser.getPassword()));
            repo.save(user);
        }

        User responseUser = new User();
        responseUser.setId(user.getId());
        responseUser.setUsername(user.getUsername());
        responseUser.setRole(user.getRole());
        responseUser.setStudent(user.getStudent());

        return ResponseEntity.ok(responseUser);
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request) {
        if (request.getUsername() == null || request.getUsername().trim().isEmpty()) {
            throw new BadRequestException("Username is required");
        }
        if (request.getOldPassword() == null || request.getOldPassword().isEmpty()) {
            throw new BadRequestException("Current password is required");
        }
        if (request.getNewPassword() == null || request.getNewPassword().length() < 4) {
            throw new BadRequestException("New password must be at least 4 characters");
        }

        User user = repo.findByUsername(request.getUsername().trim())
                .orElseThrow(() -> new BadRequestException("User not found"));

        boolean isOldValid = PasswordUtil.verifyPassword(request.getOldPassword(), user.getPassword());
        if (!isOldValid) {
            throw new BadRequestException("Current password is incorrect");
        }

        user.setPassword(PasswordUtil.hashPassword(request.getNewPassword()));
        repo.save(user);

        Map<String, String> res = new HashMap<>();
        res.put("message", "Password changed successfully");
        return ResponseEntity.ok(res);
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = repo.findAll();
        users.forEach(u -> u.setPassword(null));
        return ResponseEntity.ok(users);
    }
}
