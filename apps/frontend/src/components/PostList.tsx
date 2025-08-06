import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'

type Post = {
  id: string
  title: string
  content: string
  createdAt: string
}

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const loaderRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    fetch(`/api/posts?page=${page}&size=20`)
      .then(res => res.json())
      .then(data => {
        setPosts(prev => [...prev, ...data.content])
        setHasMore(page + 1 < data.totalPages)
      })
  }, [page])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(p => p + 1)
        }
      },
      { threshold: 1 }
    )
    if (loaderRef.current) observer.observe(loaderRef.current)
    return () => observer.disconnect()
  }, [hasMore])

  return (
    <div>
      <ul>
        {posts.map(post => (
          <li key={post.id} style={{ marginBottom: '24px' }}>
            <Link to={`/blog/${post.id}`}>
              <h2>{post.title}</h2>
            </Link>
            <p>{post.createdAt.slice(0, 10)}</p>
            <p>{post.content.slice(0, 100)}...</p>
          </li>
        ))}
      </ul>
      <div ref={loaderRef} style={{ height: 40 }} />
    </div>
  )
}

export default PostList
