import { Typography } from '@mui/material'

const projects = [
  {
    name: 'Arch-Lang',
    description: 'Arch is a self-consistent, modular programming language using type theory.',
    link: 'https://github.com/SouPuppy/Arch',
  },
]

const ProjectPage: React.FC = () => {
  return (
    <>
      <div
        style={{
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
          textAlign: 'center',
          paddingTop: '40px',
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
        >
          Projects
        </Typography>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 20px))',
          justifyContent: 'center',
          columnGap: '40px',
          rowGap: '40px',
          padding: '32px 0px',
          boxSizing: 'border-box',
          maxWidth: '1440px',
          margin: '0 auto',
        }}
      >
        {projects.map((proj, index) => (
          <div
            key={`${proj.name}-${index}`}
            style={{
              textDecoration: 'none',
              color: 'inherit',
              border: '1px solid #e1e4e8',
              borderRadius: '1px',
              paddingTop: '15px',
              paddingLeft: '18px',
              paddingRight: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              transition: 'box-shadow 0.2s ease-in-out',
              width: '310px',
              height: '105px',
              boxSizing: 'border-box',
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 3px rgba(0,0,0,0.1)'
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
            }}
          >
            <a
              href={proj.link}
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
              {proj.name}
            </a>
            <div
              style={{
                fontSize: '16px',
                fontWeight: 300,
                color: '#57606a',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                hyphens: 'auto',
                lineBreak: 'strict',
              }}
              lang="en"
            >
              {proj.description}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default ProjectPage
