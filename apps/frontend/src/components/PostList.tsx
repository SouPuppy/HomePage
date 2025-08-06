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
  views?: number
  likes?: number
  favorites?: number
}

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [copiedPostId, setCopiedPostId] = useState<string | null>(null)

  const loaderRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!hasMore || isLoading) return

    setIsLoading(true)

    fetch(`/api/posts?page=${page}&size=20`)
      .then(res => res.json())
      .then(data => {
        setPosts(prev => [...prev, ...data.content])
        setHasMore(page + 1 < data.totalPages)
        setIsLoading(false)
      })
  }, [page])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setPage(p => p + 1)
        }
      },
      { threshold: 1 }
    )
    if (loaderRef.current) observer.observe(loaderRef.current)
    return () => observer.disconnect()
  }, [hasMore, isLoading])

  const handleCopy = (postId: string) => {
    const url = `${window.location.origin}/blog/${postId}`
    navigator.clipboard.writeText(url).then(() => {
      setCopiedPostId(postId)
      setTimeout(() => setCopiedPostId(null), 1000)
    })
  }

  return (
    <div style={{ paddingLeft: '0px', paddingRight: '2px', paddingTop: '0px' ,
    width: '100%'}}>
      {posts.map(post => (
        <div
          key={post.id}
          style={{
            padding: '5px 0px 10px 0px',
            borderBottom: '1px solid #eaeaea',
            marginBottom: '8px',
          }}
        >
          <Link to={`/blog/${post.id}`} style={{ textDecoration: 'none', color: '#222' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600 }}>{post.title}</h2>
          </Link>

          <div style={{ fontSize: '14px', color: '#666', margin: '8px 0' }}>
            {post.description ?? post.content.slice(0, 100)}...
          </div>

          <div
            style={{
              fontSize: '13px',
              color: '#999',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>{post.createdAt.slice(0, 10)}</span>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
              }}
              onClick={() => handleCopy(post.id)}
            >
              <Share2 size={16} />
              <span style={{ fontSize: '12px', color: '#999' }}>
                {copiedPostId === post.id ? 'Coppied URL in clipboard' : 'Share'}
              </span>
            </div>
          </div>
        </div>
      ))}

      {/* 触底加载触发器 */}
      <div ref={loaderRef} style={{ height: 40 }} />

      {/* 可选加载提示 */}
      {isLoading && <p style={{ textAlign: 'center', color: '#999' }}>加载中...</p>}
      {!hasMore && <p style={{ textAlign: 'center', color: '#999' }}>已加载全部文章</p>}
    </div>
  )
}

export default PostList
