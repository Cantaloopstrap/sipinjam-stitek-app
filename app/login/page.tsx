'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, GraduationCap } from 'lucide-react'
import { toast } from 'sonner'

export default function LoginPage() {
  const [nim, setNim] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))

    const success = login(nim, password)
    
    if (success) {
      toast.success('Login berhasil!')
      // Redirect will be handled by the auth context
      if (nim === 'admin') {
        router.push('/admin/dashboard')
      } else {
        router.push('/user/dashboard')
      }
    } else {
      setError('NIM atau password salah')
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary">
            <GraduationCap className="size-8 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">SIPINJAM STITEK</CardTitle>
            <CardDescription className="mt-2">
              Sistem Informasi Peminjaman<br />
              STITEK Bontang
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="size-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="nim">NIM / Username</Label>
              <Input
                id="nim"
                type="text"
                placeholder="Masukkan NIM atau username"
                value={nim}
                onChange={(e) => setNim(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Memproses...' : 'Login'}
            </Button>

            <div className="rounded-lg bg-muted p-4 text-sm">
              <p className="font-medium mb-2">Demo Credentials:</p>
              <p className="text-muted-foreground">
                <strong>Admin:</strong> admin / admin123<br />
                <strong>Mahasiswa:</strong> 2021010001 / password123
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
