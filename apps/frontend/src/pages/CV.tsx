import React from 'react'
import { Github } from 'lucide-react' // ✅ 引入 Lucide GitHub 图标
import Link from '@mui/material/Link';

const CVPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', marginTop: '20px' }}>
      {/* Sidebar */}
      <aside style={{ width: '240px', paddingTop: '28px', paddingLeft: '64px', minHeight: '100vh', boxSizing: 'border-box' }}>
        {/* 头像圆形框 */}
        <div
          style={{
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            backgroundColor: '#f2f3f3',
            border: '4px solid #fff',
            boxShadow: '0 0 0 1px #ccc',
            overflow: 'hidden',
            margin: '0 auto',
          }}
        >
          <img
            src="/profile.png"
            alt="Profile"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '50%',
            }}
          />
        </div>

        {/* 名字与简介 */}
        <h3 style={{ marginTop: '20px', textAlign: 'center' }}>Soupup</h3>
        <p style={{ textAlign: 'center' }}>What can I say?</p>

        {/* 链接列表 */}
        <ul style={{ listStyle: 'none', padding: 0, lineHeight: '1.8em', marginTop: '16px', marginLeft: '15px' }}>
          <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Github size={16} /> <Link href="#"> GitHub</Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main style={{ paddingLeft: '120px', flex: 1, maxWidth: '800px' }}>
        <h1 style={{ marginBottom: '24px', fontSize: '32px' }}>About</h1>

        <section>
          <h2>Education</h2>
          <ul>
            <li>U.G, progressing</li>
          </ul>
        </section>

        <section style={{ marginTop: '10px' }}>
          <h2>Work experience</h2>
          <ul>
            <li>
              Unemployment
            </li>
          </ul>
        </section>

        <section style={{ marginTop: '10px' }}>
          <h2>Skills</h2>
          <ul>
            <li>Sleeping</li>
            <li>Eating</li>
            <li>Day dreaming</li>
          </ul>
        </section>
      </main>
    </div>
  )
}

export default CVPage
