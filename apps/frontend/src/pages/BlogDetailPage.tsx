import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
// import 'katex/dist/katex.min.css'

type Post = {
  title: string
  content: string
  createdAt: string
}

const BlogDetailPage = () => {
  const { id } = useParams()
  const [post, setPost] = useState<Post | null>(null)

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then(res => res.json())
      .then(data => setPost(data))
  }, [id])

  if (!post) return <p>加载中...</p>

  return (
    <div style={{ padding: '32px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{post.title}</h1>
      <p style={{ color: '#888' }}>{post.createdAt.slice(0, 10)}</p>
      <ReactMarkdown
        children={post.content}
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
      />
    </div>
  )
}

export default BlogDetailPage
