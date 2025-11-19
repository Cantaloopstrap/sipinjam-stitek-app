'use client'

import { useState } from 'react'
import { rooms } from '@/lib/data'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, MapPin, Users, Wifi, Monitor, Wind } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function RoomsPage() {
  const [search, setSearch] = useState('')
  const [buildingFilter, setBuildingFilter] = useState('all')

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.nama.toLowerCase().includes(search.toLowerCase()) || 
                          room.kode.toLowerCase().includes(search.toLowerCase())
    const matchesBuilding = buildingFilter === 'all' || room.gedung === buildingFilter
    return matchesSearch && matchesBuilding
  })

  const buildings = Array.from(new Set(rooms.map(r => r.gedung)))

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Data Ruangan</h2>
          <p className="text-muted-foreground">Cari dan pinjam ruangan untuk kegiatan akademik</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <Input
              placeholder="Cari ruangan..."
              className="pl-8 w-full sm:w-[250px]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={buildingFilter} onValueChange={setBuildingFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Pilih Gedung" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Gedung</SelectItem>
              {buildings.map(building => (
                <SelectItem key={building} value={building}>{building}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredRooms.map((room) => (
          <Card key={room.id} className="overflow-hidden flex flex-col">
            <div className="aspect-video relative w-full">
              <Image 
                src={room.foto || "/placeholder.svg"} 
                alt={room.nama}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge variant={
                  room.status === 'Tersedia' ? 'default' : 
                  room.status === 'Dipinjam' ? 'secondary' : 'destructive'
                }>
                  {room.status}
                </Badge>
              </div>
            </div>
            <CardHeader className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{room.nama}</CardTitle>
                  <p className="text-sm text-muted-foreground">{room.kode}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <MapPin className="size-4" />
                <span>{room.gedung}, Lantai {room.lantai}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Users className="size-4" />
                <span>Kapasitas {room.kapasitas} orang</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {room.fasilitas.slice(0, 3).map((fasilitas, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs font-normal">
                    {fasilitas}
                  </Badge>
                ))}
                {room.fasilitas.length > 3 && (
                  <Badge variant="outline" className="text-xs font-normal">
                    +{room.fasilitas.length - 3}
                  </Badge>
                )}
              </div>
            </CardContent>
            <CardFooter className="p-4 bg-muted/50">
              <Button className="w-full" asChild disabled={room.status !== 'Tersedia'}>
                <Link href={`/user/borrow?type=room&id=${room.id}`}>
                  {room.status === 'Tersedia' ? 'Pinjam Ruangan' : 'Tidak Tersedia'}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {filteredRooms.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">Tidak ada ruangan yang ditemukan</p>
        </div>
      )}
    </div>
  )
}
