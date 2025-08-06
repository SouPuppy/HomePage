import React from 'react'
import { Github, Mail } from 'lucide-react'
import Link from '@mui/material/Link';

const AboutPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', marginTop: '20px' }}>
      {/* Sidebar */}
      <aside style={{ width: '220px', paddingTop: '28px', paddingLeft: '0px', boxSizing: 'border-box' }}>
        {/* 头像圆形框 */}
        <div
          style={{
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            backgroundColor: '#f2f3f3',
            border: '1px solid #e2e2e2ff',
            boxShadow: '0 0.5px 0.5px 0.5px #cccccc',
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
        <p style={{ textAlign: 'center' }}>The finest yachtsman in the world don't know how to swim.</p>

        {/* 链接列表 */}
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            lineHeight: '1.8em',
            marginTop: '16px',
            marginLeft: '15px',
          }}
        >
          <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Github size={16} />
            <Link
              href="https://github.com/SouPuppy/"
              underline="none"
              sx={{
                color: 'inherit',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              GitHub
            </Link>
          </li>

          <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Mail size={16} />
            <Link
              href="mailto:wdk1745@gmail.com"
              underline="none"
              sx={{
                color: 'inherit',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              E-mail
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main style={{ paddingLeft: '120px', flex: 1, maxWidth: '800px' }}>
        <h1 style={{ marginBottom: '24px', fontSize: '32px' }}>About Me</h1>
        <p style={{
          fontSize: '16px',
          lineHeight: '1.8',
          textAlign: 'justify',
        }}>
          <span style={{
            fontSize: '30px',
            fontFamily: 'cursive',
            fontWeight: 600,
            display: 'inline-block',
            marginRight: '2px',
          }}>
            H
          </span>
          i, I am Soupup, a current CS student. I began programming with C in 2016, and I'm happy to share my point of view on this blog.
        </p>

        <section>
          <h2>Education</h2>
          <ul>
            <li>B.S. in University of Nottingham & City University of Hong Kong</li>
          </ul>
        </section>
      </main>
    </div>
  )
}

export default AboutPage
