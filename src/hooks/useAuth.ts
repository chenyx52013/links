import { useContext, createContext, ReactNode } from 'react'

type User = {
  id: string
  email: string
  name?: string
}

type AuthContextType = {
  user: User | null
  loading: boolean
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  // This is a placeholder implementation
  // In a real app, you'd use the actual Auth.js client
  const value: AuthContextType = {
    user: null,
    loading: false,
    signIn: async () => {
      window.location.href = '/auth/signin'
    },
    signOut: async () => {
      window.location.href = '/auth/signout'
    },
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}