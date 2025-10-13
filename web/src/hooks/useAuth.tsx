import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User } from '@shared/types'
import { STORAGE_KEYS } from '@shared/constants'

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Cargar token del localStorage al inicializar
    const savedToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
    if (savedToken) {
      setToken(savedToken)
      // Aquí normalmente harías una llamada a la API para obtener el usuario
      // Por ahora, simulamos un usuario
      setUser({
        id: '1',
        email: 'admin@crm.com',
        name: 'Administrador',
        role: 'admin' as any,
        company: 'CRM Solutions',
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulación de login - en producción esto sería una llamada a la API
      if (email === 'admin@crm.com' && password === 'admin123') {
        const mockToken = 'mock-jwt-token'
        const mockUser: User = {
          id: '1',
          email,
          name: 'Administrador',
          role: 'admin' as any,
          company: 'CRM Solutions',
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, mockToken)
        setToken(mockToken)
        setUser(mockUser)
      } else {
        throw new Error('Credenciales inválidas')
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN)
    setToken(null)
    setUser(null)
  }

  const value = {
    user,
    token,
    login,
    logout,
    isLoading,
    isAuthenticated: !!token && !!user,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider')
  }
  return context
}