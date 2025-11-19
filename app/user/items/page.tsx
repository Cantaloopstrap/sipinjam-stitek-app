'use client'

import { useState } from 'react'
import { items } from '@/lib/data'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Package, Box, AlertCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function ItemsPage() {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')

  const filteredItems = items.filter(item => {
    const matchesSearch = item.nama.toLowerCase().includes(search.toLowerCase()) || 
                          item.kode.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || item.kategori === categoryFilter
    return matchesSearch && matchesCategory
  })

  const categories = Array.from(new Set(items.map(i => i.kategori)))

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Data Barang</h2>
          <p className="text-muted-foreground">Katalog barang inventaris yang dapat dipinjam</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <Input
              placeholder="Cari barang..."
              className="pl-8 w-full sm:w-[250px]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Pilih Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Kategori</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredItems.map((item) => (
          <Card key={item.id} className="overflow-hidden flex flex-col">
            <div className="aspect-square relative w-full bg-muted">
              <Image 
                src={item.foto || "/placeholder.svg"} 
                alt={item.nama}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge variant={item.jumlah_tersedia > 0 ? 'default' : 'destructive'}>
                  {item.jumlah_tersedia > 0 ? 'Tersedia' : 'Habis'}
                </Badge>
              </div>
            </div>
            <CardHeader className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg line-clamp-1">{item.nama}</CardTitle>
                  <p className="text-sm text-muted-foreground">{item.kode}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Package className="size-4" />
                <span>Kategori: {item.kategori}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Box className="size-4" />
                <span>Stok: {item.jumlah_tersedia} / {item.jumlah_total} unit</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <AlertCircle className="size-4" />
                <span>Kondisi: {item.kondisi}</span>
              </div>
            </CardContent>
            <CardFooter className="p-4 bg-muted/50">
              <Button className="w-full" asChild disabled={item.jumlah_tersedia === 0}>
                <Link href={`/user/borrow?type=item&id=${item.id}`}>
                  {item.jumlah_tersedia > 0 ? 'Pinjam Barang' : 'Stok Habis'}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">Tidak ada barang yang ditemukan</p>
        </div>
      )}
    </div>
  )
}
