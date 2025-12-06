import Dashboard from './pages/Dashboard'
import { AuthProvider } from './hooks/useAuth'

function App() {
  return (
    <AuthProvider>
      <Dashboard />
    </AuthProvider>
  )
}

export default App