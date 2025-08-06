import ProjectCard from '../components/ProjectCard'
import { Typography } from '@mui/material';

const projects = [
  {
    name: 'Arch-Lang',
    description: 'Arch is a self-consistent, modular programming language using type theory.',
    link: 'https://github.com/SouPuppy/Arch',
  }
]

const ProjectPage: React.FC = () => {
  return (
    <>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{paddingLeft: 5, marginTop: '40px'}}>
        Projects
      </Typography>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          rowGap: '58px',
          columnGap: '28px',
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
