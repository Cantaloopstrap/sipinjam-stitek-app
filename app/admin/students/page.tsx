'use client'

import { useState } from 'react'
import { students } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Search, MoreHorizontal, Ban, CheckCircle } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'

export default function AdminStudentsPage() {
  const [search, setSearch] = useState('')
  
  const filteredStudents = students.filter(student => 
    student.nama.toLowerCase().includes(search.toLowerCase()) || 
    student.nim.includes(search)
  )

  const handleStatusChange = (id: string, status: string) => {
    toast.success(`Status mahasiswa berhasil diubah menjadi ${status}`)
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Kelola Mahasiswa</h2>
        <p className="text-muted-foreground">Data mahasiswa dan status akun</p>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder="Cari nama atau NIM..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mahasiswa</TableHead>
              <TableHead>NIM</TableHead>
              <TableHead>Prodi</TableHead>
              <TableHead>Angkatan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={student.foto || "/placeholder.svg"} />
                      <AvatarFallback>{student.nama.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="font-medium">{student.nama}</div>
                  </div>
                </TableCell>
                <TableCell>{student.nim}</TableCell>
                <TableCell>{student.prodi}</TableCell>
                <TableCell>{student.angkatan}</TableCell>
                <TableCell>
                  <Badge variant={student.status === 'Aktif' ? 'default' : 'destructive'}>
                    {student.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleStatusChange(student.id, 'Aktif')}>
                        <CheckCircle className="mr-2 size-4" /> Aktifkan
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(student.id, 'Suspend')} className="text-red-600">
                        <Ban className="mr-2 size-4" /> Suspend
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
