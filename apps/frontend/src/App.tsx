import NavBar from './components/NavBar'
import Center from './components/Center'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SideNavLayout from './components/SideNavLayout'
import AboutPage from './pages/AboutPage'
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectPage'

import BlogPage from './pages/BlogPage'
import BlogDetailPage from './pages/BlogDetailPage'

function App() {
  return (
    <>
      <NavBar/>
      <BrowserRouter>
        <SideNavLayout>
            <Routes>
              <Route path="/" element={<><HomePage /></>} />
              <Route path="/projects" element={<Center><ProjectsPage /></Center>} />
              <Route path="/blog" element={<Center><BlogPage /></Center>} />
              <Route path="/blog/:id" element={<Center><BlogDetailPage /></Center>} />
              <Route path="/about" element={<Center><AboutPage /></Center>} />
            </Routes>
        </SideNavLayout>
      </BrowserRouter>
    </>
  )
}

export default App
