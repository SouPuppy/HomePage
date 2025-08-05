// src/App.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import Home from './pages/Home'
import AppPage from './pages/AppPage'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<AppPage />} />
      </Routes>
    </Router>
  )
}
