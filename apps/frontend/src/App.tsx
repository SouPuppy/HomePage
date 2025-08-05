import NavBar from './components/NavBar'
import SideNavLayout from './components/SideNavLayout'

export default function App() {
  return (
    <div>
      <NavBar/>
        <SideNavLayout>
        <div style={{ padding: '20px' }}>
          <h1>Welcome to the App</h1>
          <p>This is the main content area.</p>
        </div>
      </SideNavLayout>
    </div>
  )
}
