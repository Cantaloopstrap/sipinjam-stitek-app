'use client'

import { useState } from 'react'
import { rooms } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Search, Edit, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

export default function AdminRoomsPage() {
  const [search, setSearch] = useState('')
  
  const filteredRooms = rooms.filter(room => 
    room.nama.toLowerCase().includes(search.toLowerCase()) || 
    room.kode.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = () => {
    toast.success('Ruangan berhasil dihapus')
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Kelola Ruangan</h2>
          <p className="text-muted-foreground">Manajemen data ruangan kampus</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 size-4" /> Tambah Ruangan
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Tambah Ruangan Baru</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Kode</Label>
                <Input className="col-span-3" placeholder="Contoh: RG-A101" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Nama</Label>
                <Input className="col-span-3" placeholder="Nama Ruangan" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Gedung</Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Pilih Gedung" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">Gedung A</SelectItem>
                    <SelectItem value="B">Gedung B</SelectItem>
                    <SelectItem value="C">Gedung C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Kapasitas</Label>
                <Input type="number" className="col-span-3" />
              </div>
            </div>
            <Button onClick={() => toast.success('Ruangan berhasil ditambahkan')}>Simpan</Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder="Cari ruangan..."
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
              <TableHead>Kode</TableHead>
              <TableHead>Nama Ruangan</TableHead>
              <TableHead>Lokasi</TableHead>
              <TableHead>Kapasitas</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRooms.map((room) => (
              <TableRow key={room.id}>
                <TableCell className="font-medium">{room.kode}</TableCell>
                <TableCell>{room.nama}</TableCell>
                <TableCell>{room.gedung}, Lt.{room.lantai}</TableCell>
                <TableCell>{room.kapasitas} Orang</TableCell>
                <TableCell>
                  <Badge variant={room.status === 'Tersedia' ? 'default' : 'secondary'}>
                    {room.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-500" onClick={handleDelete}>
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
