package online.soupup.homepage.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "posts")
public class Post {
  @Id
  @GeneratedValue
  @Column(columnDefinition = "UUID", updatable = false, nullable = false)
  private UUID id;

  private String title;

  @Column(columnDefinition = "TEXT")
  private String content;

  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

  public Post() {}

  public UUID getId() { return id; }
  public void setId(UUID id) { this.id = id; }
}
