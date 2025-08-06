package online.soupup.homepage.controller;

import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.*;

@RestController
@RequestMapping("/api/posts")
public class FakePostController {

    private final List<Map<String, Object>> allPosts;

    public FakePostController() {
        int totalPosts = 100;

        this.allPosts = IntStream.range(0, totalPosts)
            .mapToObj(i -> {
                Map<String, Object> post = new HashMap<>();
                post.put("id", "post-" + i);
                post.put("title", "Sample Article " + (i + 1));
                post.put("content", "# Markdown Body " + (i + 1) + "\nThis is a demo article content in markdown format.");
                post.put("description", "This is a mock summary for article number " + (i + 1) + ", designed for frontend display.");
                post.put("author", "user_" + (i % 5));
                post.put("createdAt", LocalDateTime.now().minusDays(i).toString());
                post.put("views", 100 + i * 2);
                post.put("likes", (i * 3) % 50);
                post.put("favorites", (i * 2) % 10);
                return post;
            })
            .collect(Collectors.toList());
    }

    @GetMapping
    public Map<String, Object> getFakePosts(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "20") int size
    ) {
        int totalPosts = allPosts.size();
        int totalPages = (int) Math.ceil((double) totalPosts / size);

        int start = page * size;
        int end = Math.min(start + size, totalPosts);
        List<Map<String, Object>> pageContent = start < totalPosts
            ? allPosts.subList(start, end)
            : Collections.emptyList();

        Map<String, Object> response = new HashMap<>();
        response.put("content", pageContent);
        response.put("totalPages", totalPages);
        response.put("number", page);
        response.put("size", size);

        return response;
    }
}
