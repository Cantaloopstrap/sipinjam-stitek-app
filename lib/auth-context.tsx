'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Student, students, UserRole } from './data'

interface AuthContextType {
  user: Student | null
  role: UserRole
  login: (nim: string, password: string) => boolean
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Student | null>(null)
  const [role, setRole] = useState<UserRole>('user')

  useEffect(() => {
    // Check localStorage for existing session
    const savedUser = localStorage.getItem('sipinjam_user')
    const savedRole = localStorage.getItem('sipinjam_role') as UserRole
    if (savedUser && savedRole) {
      setUser(JSON.parse(savedUser))
      setRole(savedRole)
    }
  }, [])

  const login = (nim: string, password: string): boolean => {
    // Admin login
    if (nim === 'admin' && password === 'admin123') {
      const adminUser: Student = {
        id: 'admin',
        nim: 'admin',
        nama: 'Administrator',
        email: 'admin@stitek.ac.id',
        prodi: 'Admin',
        angkatan: 2025,
        status: 'Aktif',
        foto: '/placeholder.svg?height=100&width=100'
      }
      setUser(adminUser)
      setRole('admin')
      localStorage.setItem('sipinjam_user', JSON.stringify(adminUser))
      localStorage.setItem('sipinjam_role', 'admin')
      return true
    }

    // Student login
    const student = students.find(s => s.nim === nim)
    if (student && password === 'password123') {
      setUser(student)
      setRole('user')
      localStorage.setItem('sipinjam_user', JSON.stringify(student))
      localStorage.setItem('sipinjam_role', 'user')
      return true
    }

    return false
  }

  const logout = () => {
    setUser(null)
    setRole('user')
    localStorage.removeItem('sipinjam_user')
    localStorage.removeItem('sipinjam_role')
  }

  return (
    <AuthContext.Provider value={{ user, role, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
