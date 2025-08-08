import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Share2 } from 'lucide-react'

type Post = {
  id: string
  title: string
  content: string
  description?: string
  author?: string
  createdAt: string
}

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const observer = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      try {
        const res = await fetch(`http://localhost:8080/blog?page=${page}&size=5`)
        if (!res.ok) throw new Error('Network response was not ok')
        const data: Post[] = await res.json()
        setPosts(prevPosts => {
          // 在初次加载时清空 posts，防止重复数据
          if (page === 0) return data
          return [...prevPosts, ...data]
        })
        setHasMore(data.length > 0) // 如果返回的数据为空，表示没有更多数据
      } catch (err) {
        console.error('加载失败:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [page])

  useEffect(() => {
    if (loadMoreRef.current) {
      observer.current = new IntersectionObserver((entries) => {
        const entry = entries[0]
        if (entry.isIntersecting && hasMore && !loading) {
          setPage(prevPage => prevPage + 1)
        }
      })
      observer.current.observe(loadMoreRef.current)
    }

    return () => {
      if (observer.current && loadMoreRef.current) {
        observer.current.unobserve(loadMoreRef.current)
      }
    }
  }, [loading, hasMore])

  const handleCopy = (id: string) => {
    const url = `${window.location.origin}/blog/${id}`
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 1000)
    })
  }

  if (loading && page === 0) return <p style={{ textAlign: 'center', color: '#888' }}>加载中...</p>

  return (
    <div style={{ padding: '0 2px' }}>
      {posts.map(post => (
        <div key={post.id} style={{ borderBottom: '1px solid #eee', paddingBottom: 10, marginBottom: 10 }}>
          <Link to={`/blog/${post.id}`} style={{ textDecoration: 'none', color: '#222' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600 }}>{post.title}</h2>
          </Link>
          <p style={{ fontSize: '14px', color: '#666' }}>
            {post.description ?? post.content.slice(0, 100)}...
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#999' }}>
            <span>{post.createdAt.slice(0, 10)}</span>
            <span
              onClick={() => handleCopy(post.id)}
              style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '6px' }}
            >
              <Share2 size={14} />
              {copiedId === post.id ? '已复制' : '分享'}
            </span>
          </div>
        </div>
      ))}

      {loading && hasMore && <p style={{ textAlign: 'center', color: '#888' }}>加载更多...</p>}

      <div ref={loadMoreRef} style={{ height: '20px', backgroundColor: 'transparent' }} />
    </div>
  )
}

export default PostList
