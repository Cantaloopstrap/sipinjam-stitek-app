'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { borrowings, rooms, items, students } from '@/lib/data'
import { Activity, AlertCircle, CheckCircle2, Clock, Users, Package, Building2 } from 'lucide-react'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

export default function AdminDashboard() {
  // Calculate stats
  const pendingRequests = borrowings.filter(b => b.status === 'Pending').length
  const activeBorrowings = borrowings.filter(b => b.status === 'Berlangsung').length
  const overdueBorrowings = borrowings.filter(b => b.status === 'Terlambat').length
  const totalStudents = students.length
  
  // Chart data
  const data = [
    { name: 'Senin', total: 12 },
    { name: 'Selasa', total: 18 },
    { name: 'Rabu', total: 15 },
    { name: 'Kamis', total: 22 },
    { name: 'Jumat', total: 20 },
    { name: 'Sabtu', total: 8 },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
        <p className="text-muted-foreground">Overview sistem peminjaman STITEK</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <Clock className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingRequests}</div>
            <p className="text-xs text-muted-foreground">Menunggu persetujuan</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sedang Dipinjam</CardTitle>
            <Activity className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeBorrowings}</div>
            <p className="text-xs text-muted-foreground">Aktif saat ini</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Terlambat</CardTitle>
            <AlertCircle className="size-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{overdueBorrowings}</div>
            <p className="text-xs text-muted-foreground">Perlu tindak lanjut</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Mahasiswa</CardTitle>
            <Users className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
            <p className="text-xs text-muted-foreground">Terdaftar di sistem</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Statistik Peminjaman Minggu Ini</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={data}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                <Bar dataKey="total" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Status Inventaris</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-100 text-blue-600 mr-4">
                  <Building2 className="size-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Ruangan Tersedia</p>
                  <p className="text-xs text-muted-foreground">{rooms.filter(r => r.status === 'Tersedia').length} dari {rooms.length} ruangan</p>
                </div>
                <div className="font-bold">{Math.round((rooms.filter(r => r.status === 'Tersedia').length / rooms.length) * 100)}%</div>
              </div>
              <div className="flex items-center">
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-green-100 text-green-600 mr-4">
                  <Package className="size-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Barang Tersedia</p>
                  <p className="text-xs text-muted-foreground">{items.filter(i => i.jumlah_tersedia > 0).length} dari {items.length} item</p>
                </div>
                <div className="font-bold">{Math.round((items.filter(i => i.jumlah_tersedia > 0).length / items.length) * 100)}%</div>
              </div>
              <div className="flex items-center">
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-red-100 text-red-600 mr-4">
                  <AlertCircle className="size-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Barang Rusak</p>
                  <p className="text-xs text-muted-foreground">{items.filter(i => i.kondisi !== 'Baik').length} item perlu perbaikan</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
