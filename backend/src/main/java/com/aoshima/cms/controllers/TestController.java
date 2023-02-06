package com.aoshima.cms.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
@CrossOrigin(origins = "*", maxAge = 3600)
public class TestController {
    @RequestMapping("/all")
    public String allAccess() {
        return "Public Content.";
    }

    @RequestMapping("/user")
    public String userAccess() {
        return "User Content.";
    }

    @RequestMapping("/admin")
    public String adminAccess() {
        return "Admin Board.";
    }
}
