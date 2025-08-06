import ProjectCard from '../components/ProjectCard'
import { Typography } from '@mui/material';

const projects = [
  {
    name: 'Express-Language',
    description: 'A declarative language designed for structured text transformation.',
    languages: ['TeX', 'TypeScript'],
    link: 'https://github.com/SouPuppy/Express-Language',
  },  {
    name: 'Express-Language',
    description: 'A declarative language designed for structured text transformation.',
    languages: ['TeX', 'TypeScript'],
    link: 'https://github.com/SouPuppy/Express-Language',
  },  {
    name: 'Express-Language',
    description: 'A declarative language designed for structured text transformation.',
    languages: ['TeX', 'TypeScript'],
    link: 'https://github.com/SouPuppy/Express-Language',
  },  {
    name: 'Express-Language',
    description: 'A declarative language designed for structured text transformation.',
    languages: ['TeX', 'TypeScript'],
    link: 'https://github.com/SouPuppy/Express-Language',
  },
]

const ProjectPage: React.FC = () => {
  return (
    <>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{paddingLeft: 5, marginTop: '20px'}}>
        Projects
      </Typography>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '16px',
          padding: '24px 40px',
        }}
      >
        {projects.map((proj) => (
          <ProjectCard key={proj.name} {...proj} />
        ))}
      </div>
    </>
  )
}

export default ProjectPage
