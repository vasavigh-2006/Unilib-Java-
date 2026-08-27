package com.example.library.dto;

import com.example.library.entity.Student;

public class AuthResponse {
    private Long id;
    private String username;
    private String role;
    private Student student;
    private String message;

    public AuthResponse() {}

    public AuthResponse(Long id, String username, String role, Student student, String message) {
        this.id = id;
        this.username = username;
        this.role = role;
        this.student = student;
        this.message = message;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
