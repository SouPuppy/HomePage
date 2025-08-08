import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import rehypeKatex from 'rehype-katex'

import 'katex/dist/katex.min.css'
import 'highlight.js/styles/github.css'

interface BlogPost {
  id: string
  title: string
  description: string
  content: string
  createdAt: string
  updatedAt: string
}

const BlogEditPage = () => {
  const { id } = useParams<{ id?: string }>() // id 可选
  const navigate = useNavigate()

  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  // 判断是否为新建模式
  const isNew = !id

  useEffect(() => {
    if (isNew) {
      // 初始化空文章
      setPost({
        id: '',
        title: '',
        description: '',
        content: '',
        createdAt: '',
        updatedAt: ''
      })
      setLoading(false)
      return
    }

    // 加载现有文章
    fetch(`http://localhost:8080/blog/${id}`)
      .then(res => res.json())
      .then(data => {
        setPost(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('加载失败:', err)
        alert('文章加载失败')
        setLoading(false)
      })
  }, [id])

  const handleSave = async () => {
    if (!post) return

    const res = await fetch(`http://localhost:8080/blog${isNew ? '' : `/${id}`}`, {
      method: isNew ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post)
    })

    if (res.ok) {
      alert('保存成功')
      const saved = await res.json()
      navigate(`/blog/${saved.id}`)
    } else {
      alert('保存失败')
    }
  }

  if (loading || !post) return <div style={{ padding: '2rem' }}>正在加载文章内容...</div>

  return (
    <div style={{ display: 'flex', gap: '2rem', padding: '2rem' }}>
      {/* 编辑器区域 */}
      <div style={{ flex: 1 }}>
        <input
          value={post.title}
          onChange={e => setPost({ ...post, title: e.target.value })}
          placeholder="文章标题"
          style={{ width: '100%', fontSize: 20, marginBottom: 10 }}
        />
        <textarea
          value={post.description}
          onChange={e => setPost({ ...post, description: e.target.value })}
          placeholder="摘要"
          style={{ width: '100%', height: 60, marginBottom: 10 }}
        />
        <textarea
          value={post.content}
          onChange={e => setPost({ ...post, content: e.target.value })}
          placeholder="Markdown 内容"
          style={{ width: '100%', height: '400px', fontFamily: 'monospace' }}
        />
        <button onClick={handleSave} style={{ marginTop: 20 }}>💾 保存文章</button>
      </div>

      {/* 实时预览区域 */}
      <div style={{ flex: 1, overflowY: 'auto', maxHeight: '600px' }}>
        <h2>🪄 实时预览</h2>
        <div className="markdown-body">
          <ReactMarkdown
            children={post.content}
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeRaw, rehypeHighlight, rehypeKatex]}
          />
        </div>
      </div>
    </div>
  )
}

export default BlogEditPage
