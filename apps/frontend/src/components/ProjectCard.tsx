// ProjectCard.tsx
import React from 'react'

interface ProjectCardProps {
  name: string
  description: string
  languages: string[]
  link: string
}

const ProjectCard: React.FC<ProjectCardProps> = ({ name, description, link }) => {
  return (
    <div
      style={{
        textDecoration: 'none',
        color: 'inherit',
        border: '1px solid #e1e4e8',
        borderRadius: '1px',
        paddingTop: '15px',
        paddingLeft: '20px',
        paddingBottom: '15px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        transition: 'box-shadow 0.2s ease-in-out',
        width: '320px',
        height: '110px'
      }}
      onMouseOver={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 3px rgba(0,0,0,0.1)'
      }}
      onMouseOut={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
      }}
    >
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontWeight: 700,
          fontSize: '16px',
          color: '#144884ff',
          fontFamily: 'Segoe UI Semibold, Inter, sans-serif',
          textDecoration: 'none',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.color = '#3786dbff'
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.color = '#144884ff'
        }}
      >
        {name}
      </a>
      <div
        style={{
          fontSize: '16px',
          fontWeight: 500,
          color: '#57606a',
          whiteSpace: 'pre-wrap',
        }}
      >
        {description}
      </div>
    </div>
  )
}

export default ProjectCard