'use client'

import { useAuth } from '@/lib/auth-context'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'

export default function ProfilePage() {
  const { user } = useAuth()

  const handleSave = () => {
    toast.success('Profil berhasil diperbarui')
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold tracking-tight mb-6">Profile Saya</h2>
      
      <div className="grid gap-6 md:grid-cols-[250px_1fr]">
        <Card>
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <Avatar className="h-32 w-32 mb-4">
              <AvatarImage src={user?.foto || "/placeholder.svg"} alt={user?.nama} />
              <AvatarFallback className="text-2xl">{user?.nama?.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm" className="w-full">Ubah Foto</Button>
            
            <div className="mt-6 w-full space-y-2 text-left">
              <div>
                <p className="text-xs text-muted-foreground">Status Mahasiswa</p>
                <p className="font-medium text-green-600">{user?.status}</p>
              </div>
              <Separator />
              <div>
                <p className="text-xs text-muted-foreground">Angkatan</p>
                <p className="font-medium">{user?.angkatan}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Diri</CardTitle>
              <CardDescription>Informasi data diri Anda dari SIAKAD (Read-only)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>NIM</Label>
                  <Input value={user?.nim} disabled />
                </div>
                <div className="space-y-2">
                  <Label>Program Studi</Label>
                  <Input value={user?.prodi} disabled />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Nama Lengkap</Label>
                <Input value={user?.nama} disabled />
              </div>
              <div className="space-y-2">
                <Label>Email Institusi</Label>
                <Input value={user?.email} disabled />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kontak & Keamanan</CardTitle>
              <CardDescription>Update informasi kontak dan password Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Nomor WhatsApp</Label>
                <Input defaultValue={user?.noWhatsapp || ''} placeholder="08..." />
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                <h4 className="font-medium">Ganti Password</h4>
                <div className="space-y-2">
                  <Label>Password Lama</Label>
                  <Input type="password" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Password Baru</Label>
                    <Input type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label>Konfirmasi Password</Label>
                    <Input type="password" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSave}>Simpan Perubahan</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
