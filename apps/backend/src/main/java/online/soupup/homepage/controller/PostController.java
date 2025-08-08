package online.soupup.homepage.controller;

import online.soupup.homepage.model.Post;
import online.soupup.homepage.repository.PostRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/blog")
public class PostController {

    private final PostRepository repo;

    public PostController(PostRepository repo) {
        this.repo = repo;
    }

    // ✅ 只返回分页内容（不带分页元信息）
    @GetMapping
    public List<Post> listPagedPosts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        return repo.findAll(pageable).getContent();
    }

    // 🔍 获取指定文章
    @GetMapping("/{id}")
    public ResponseEntity<Post> getById(@PathVariable UUID id) {
        Optional<Post> post = repo.findById(id);
        return post.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // 💾 修改现有文章
    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable UUID id, @RequestBody Post data) {
        return repo.findById(id).map(existing -> {
            existing.setTitle(data.getTitle());
            existing.setDescription(data.getDescription());
            existing.setContent(data.getContent());
            existing.setUpdatedAt(LocalDateTime.now());
            repo.save(existing);
            return ResponseEntity.ok(existing);
        }).orElse(ResponseEntity.notFound().build());
    }

    // 🆕 新建文章
    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody Post data) {
        data.setId(UUID.randomUUID());
        data.setCreatedAt(LocalDateTime.now());
        data.setUpdatedAt(LocalDateTime.now());
        Post saved = repo.save(data);
        return ResponseEntity.ok(saved);
    }
}
