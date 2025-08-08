// src/pages/BlogDetailPage.tsx
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import rehypeKatex from 'rehype-katex'

import 'katex/dist/katex.min.css'
import 'highlight.js/styles/github.css'
import './markdown.css'

interface BlogPost {
  id: string
  title: string
  createdAt: string
  content: string
}

const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<BlogPost | null>(null)

  useEffect(() => {
    fetch(`http://localhost:8080/blog/${id}`)
      .then(res => res.json())
      .then(data => setPost(data))
      .catch(err => console.error('加载失败', err))
  }, [id])

  if (!post) return <div style={{ padding: '2rem' }}>正在加载文章内容...</div>

  return (
    <div style={{ padding: '40px 20px', maxWidth: '800px', margin: 'auto' }}>
      <h1>{post.title}</h1>
      <p style={{ color: '#888', fontSize: '14px' }}>{new Date(post.createdAt).toLocaleString()}</p>

      <div className="markdown-body" style={{ marginTop: '30px' }}>
        <ReactMarkdown
          children={post.content}
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeRaw, rehypeHighlight, rehypeKatex]}
        />
      </div>
    </div>
  )
}

export default BlogDetailPage
