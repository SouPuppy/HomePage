import NavBar from './components/NavBar'
import SideNavLayout from './components/SideNavLayout'
import CVPage from './pages/CV'
import Center from './components/Center'

export default function App() {
  return (
    <div>
      <NavBar/>
        <SideNavLayout>
          <Center>
            <CVPage />
          </Center>
          {/* <h1>Welcome to the App</h1>
          <p>This is the main content area.</p> */}
      </SideNavLayout>
    </div>
  )
}
