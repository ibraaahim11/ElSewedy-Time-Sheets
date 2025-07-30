package com.example.elsewedybackend.login_interface.login_dtos;
import lombok.Data;

@Data
public class LoginRequest {
    private String username;
    private String password;
}
