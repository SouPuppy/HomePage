import NavBar from './components/NavBar'
import Center from './components/Center'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SideNavLayout from './components/SideNavLayout'
import AboutPage from './pages/AboutPage'
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectPage'
import AppPage from './pages/AppPage'

function App() {
  return (
    <>
      <NavBar/>
      <BrowserRouter>
        <SideNavLayout>
            <Routes>
              <Route path="/" element={<><HomePage /></>} />
              <Route path="/projects" element={<Center><ProjectsPage /></Center>} />
              <Route path="/app" element={<Center><AppPage /></Center>} />
              <Route path="/about" element={<Center><AboutPage /></Center>} />
            </Routes>
        </SideNavLayout>
      </BrowserRouter>
    </>
  )
}

export default App
