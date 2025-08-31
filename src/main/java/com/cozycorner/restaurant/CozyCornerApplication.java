package com.cozycorner.restaurant;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class CozyCornerApplication {
    public static void main(String[] args) {
        SpringApplication.run(CozyCornerApplication.class, args);
    }
}
