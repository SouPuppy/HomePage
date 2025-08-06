package online.soupup.homepage.controller;

import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.*;

@RestController
@RequestMapping("/api/posts")
public class FakePostController {

    @GetMapping
    public Map<String, Object> getFakePosts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        int totalPosts = 100; // 总共假设 100 篇文章
        int totalPages = (int) Math.ceil((double) totalPosts / size);

        List<Map<String, Object>> allPosts = IntStream.range(0, totalPosts)
            .mapToObj(i -> {
                Map<String, Object> post = new HashMap<>();
                post.put("id", UUID.randomUUID().toString());
                post.put("title", "测试文章 " + (i + 1));
                post.put("content", "# Markdown 内容 " + (i + 1) + "\n这里是正文摘要内容。");
                post.put("createdAt", LocalDateTime.now().minusDays(i).toString());
                return post;
            }).collect(Collectors.toList());

        int start = page * size;
        int end = Math.min(start + size, totalPosts);
        List<Map<String, Object>> pageContent = start < totalPosts ? allPosts.subList(start, end) : Collections.emptyList();

        Map<String, Object> response = new HashMap<>();
        response.put("content", pageContent);
        response.put("totalPages", totalPages);
        response.put("number", page);
        response.put("size", size);

        return response;
    }
}
