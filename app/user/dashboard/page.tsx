"use client"

import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, Clock, MapPin, Package, Plus, Search } from "lucide-react"
import Link from "next/link"
import { rooms, items, borrowings } from "@/lib/data"
import { Badge } from "@/components/ui/badge"

export default function UserDashboard() {
  const { user } = useAuth()

  // Calculate stats
  const activeBorrowings = borrowings.filter(
    (b) => b.userId === user?.id && (b.status === "Pending" || b.status === "Disetujui" || b.status === "Berlangsung"),
  ).length
  const totalRooms = rooms.length
  const totalItems = items.length

  // Get recent borrowings
  const recentBorrowings = borrowings
    .filter((b) => b.userId === user?.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3)

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 dashboard-bg min-h-[calc(100vh-4rem)] rounded-xl">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-lg">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Selamat Datang di SIPINJAM</h1>
          <p className="text-blue-100 max-w-2xl text-lg">
            Sistem Informasi Peminjaman Fasilitas & Inventaris STITEK Bontang. Platform terintegrasi untuk memudahkan
            civitas akademika dalam melakukan peminjaman ruangan dan barang secara efisien dan transparan.
          </p>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-white/10 skew-x-12 translate-x-12" />
        <div className="absolute right-20 bottom-0 h-full w-1/3 bg-white/5 skew-x-12 translate-x-12" />
      </div>

      <div className="flex items-center justify-between space-y-2 bg-background/80 p-4 rounded-lg backdrop-blur-sm border">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
        <div className="flex items-center space-x-2">
          <Button asChild>
            <Link href="/user/borrow">
              <Plus className="mr-2 size-4" />
              Ajukan Peminjaman
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-background/90 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peminjaman Aktif</CardTitle>
            <Clock className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeBorrowings}</div>
            <p className="text-xs text-muted-foreground">Request sedang berjalan</p>
          </CardContent>
        </Card>
        <Card className="bg-background/90 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Ruangan</CardTitle>
            <MapPin className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRooms}</div>
            <p className="text-xs text-muted-foreground">Ruangan tersedia</p>
          </CardContent>
        </Card>
        <Card className="bg-background/90 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Barang</CardTitle>
            <Package className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
            <p className="text-xs text-muted-foreground">Item inventaris</p>
          </CardContent>
        </Card>
        <Card className="bg-background/90 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status Akun</CardTitle>
            <CalendarDays className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{user?.status}</div>
            <p className="text-xs text-muted-foreground">Semester Ganjil 2025</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-background/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Peminjaman Terakhir</CardTitle>
            <CardDescription>Riwayat aktivitas peminjaman ruangan dan barang Anda.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {recentBorrowings.length > 0 ? (
                recentBorrowings.map((borrow) => (
                  <div key={borrow.id} className="flex items-center">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{borrow.itemName}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(borrow.tanggalPinjam).toLocaleDateString("id-ID", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                        })}
                      </p>
                    </div>
                    <div className="ml-auto font-medium">
                      <Badge
                        variant={
                          borrow.status === "Disetujui"
                            ? "default"
                            : borrow.status === "Pending"
                              ? "secondary"
                              : borrow.status === "Ditolak"
                                ? "destructive"
                                : borrow.status === "Selesai"
                                  ? "outline"
                                  : "default"
                        }
                      >
                        {borrow.status}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-sm text-muted-foreground py-4">Belum ada riwayat peminjaman</div>
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3 bg-background/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Quick Access</CardTitle>
            <CardDescription>Akses cepat ke fitur yang sering digunakan</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button
              variant="outline"
              className="h-20 flex-col items-center justify-center gap-2 hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all bg-transparent"
              asChild
            >
              <Link href="/user/rooms">
                <MapPin className="size-6" />
                Cari Ruangan
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col items-center justify-center gap-2 hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all bg-transparent"
              asChild
            >
              <Link href="/user/items">
                <Search className="size-6" />
                Cari Barang
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col items-center justify-center gap-2 hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all bg-transparent"
              asChild
            >
              <Link href="/user/schedule">
                <CalendarDays className="size-6" />
                Cek Jadwal
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
