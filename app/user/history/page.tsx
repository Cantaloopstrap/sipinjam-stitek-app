'use client'

import { useAuth } from '@/lib/auth-context'
import { borrowings } from '@/lib/data'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Download, Clock, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'

export default function HistoryPage() {
  const { user } = useAuth()
  
  const myBorrowings = borrowings.filter(b => b.userId === user?.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Disetujui': return 'bg-green-500'
      case 'Pending': return 'bg-yellow-500'
      case 'Ditolak': return 'bg-red-500'
      case 'Berlangsung': return 'bg-blue-500'
      case 'Selesai': return 'bg-gray-500'
      case 'Terlambat': return 'bg-red-700'
      default: return 'bg-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Disetujui': return <CheckCircle2 className="size-4" />
      case 'Pending': return <Clock className="size-4" />
      case 'Ditolak': return <XCircle className="size-4" />
      case 'Berlangsung': return <Clock className="size-4" />
      case 'Terlambat': return <AlertTriangle className="size-4" />
      default: return <CheckCircle2 className="size-4" />
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Riwayat Peminjaman</h2>
        <p className="text-muted-foreground">Pantau status dan riwayat peminjaman Anda</p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">Semua</TabsTrigger>
          <TabsTrigger value="active">Aktif</TabsTrigger>
          <TabsTrigger value="completed">Selesai</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          <div className="space-y-4">
            {myBorrowings.map((borrow) => (
              <BorrowCard key={borrow.id} borrow={borrow} getStatusColor={getStatusColor} getStatusIcon={getStatusIcon} />
            ))}
            {myBorrowings.length === 0 && <EmptyState />}
          </div>
        </TabsContent>
        
        <TabsContent value="active" className="mt-4">
          <div className="space-y-4">
            {myBorrowings.filter(b => ['Pending', 'Disetujui', 'Berlangsung'].includes(b.status)).map((borrow) => (
              <BorrowCard key={borrow.id} borrow={borrow} getStatusColor={getStatusColor} getStatusIcon={getStatusIcon} />
            ))}
            {myBorrowings.filter(b => ['Pending', 'Disetujui', 'Berlangsung'].includes(b.status)).length === 0 && <EmptyState />}
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="mt-4">
          <div className="space-y-4">
            {myBorrowings.filter(b => ['Selesai', 'Ditolak'].includes(b.status)).map((borrow) => (
              <BorrowCard key={borrow.id} borrow={borrow} getStatusColor={getStatusColor} getStatusIcon={getStatusIcon} />
            ))}
            {myBorrowings.filter(b => ['Selesai', 'Ditolak'].includes(b.status)).length === 0 && <EmptyState />}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function BorrowCard({ borrow, getStatusColor, getStatusIcon }: any) {
  const handleDownload = () => {
    toast.success('Sedang mengunduh bukti peminjaman...')
    setTimeout(() => {
      toast.success('Bukti peminjaman berhasil diunduh')
    }, 1500)
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{borrow.itemName}</CardTitle>
            <CardDescription>{borrow.kode}</CardDescription>
          </div>
          <Badge className={`${getStatusColor(borrow.status)} hover:${getStatusColor(borrow.status)} flex gap-1`}>
            {getStatusIcon(borrow.status)}
            {borrow.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Waktu Peminjaman</p>
            <p className="text-sm">
              {new Date(borrow.tanggalPinjam).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })} {new Date(borrow.tanggalPinjam).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
              {' - '}
              {new Date(borrow.tanggalKembali).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })} {new Date(borrow.tanggalKembali).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Keperluan</p>
            <p className="text-sm">{borrow.keperluan}</p>
          </div>
        </div>
        
        {borrow.feedback && (
          <div className="mt-4 p-3 bg-red-50 text-red-800 rounded-md text-sm border border-red-100">
            <strong>Catatan Admin:</strong> {borrow.feedback}
          </div>
        )}
        
        <div className="mt-4 flex justify-end gap-2">
          {borrow.status === 'Disetujui' && (
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="mr-2 size-4" />
              Unduh Bukti
            </Button>
          )}
          {borrow.status === 'Pending' && (
            <Button variant="destructive" size="sm">
              Batalkan
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function EmptyState() {
  return (
    <div className="text-center py-12 border-2 border-dashed rounded-lg">
      <p className="text-muted-foreground">Tidak ada data peminjaman</p>
    </div>
  )
}
