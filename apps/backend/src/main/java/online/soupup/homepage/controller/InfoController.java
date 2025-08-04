package online.soupup.homepage.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class InfoController {

    @GetMapping("/api/info")
    public Map<String, String> getInfo() {
        return Map.of(
            "name", "Soupup",
            "bio", "I'm a developer building my own site with Spring Boot and React!"
        );
    }
}
