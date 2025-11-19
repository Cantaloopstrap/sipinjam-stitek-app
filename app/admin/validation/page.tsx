'use client'

import { useState } from 'react'
import { borrowings, students } from '@/lib/data'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { toast } from 'sonner'
import { Check, X, Clock } from 'lucide-react'

export default function ValidationPage() {
  const [requests, setRequests] = useState(borrowings.filter(b => b.status === 'Pending'))
  const [rejectReason, setRejectReason] = useState('')
  const [selectedId, setSelectedId] = useState('')

  const handleApprove = (id: string) => {
    setRequests(requests.filter(r => r.id !== id))
    toast.success('Peminjaman disetujui')
  }

  const handleReject = () => {
    if (!rejectReason) {
      toast.error('Alasan penolakan wajib diisi')
      return
    }
    setRequests(requests.filter(r => r.id !== selectedId))
    setRejectReason('')
    setSelectedId('')
    toast.success('Peminjaman ditolak')
  }

  const getStudent = (userId: string) => students.find(s => s.id === userId)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Validasi Peminjaman</h2>
        <p className="text-muted-foreground">Kelola persetujuan peminjaman masuk</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {requests.map((req) => {
          const student = getStudent(req.userId)
          return (
            <Card key={req.id} className="flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline">{req.jenis}</Badge>
                  <span className="text-xs text-muted-foreground">{new Date(req.createdAt).toLocaleDateString()}</span>
                </div>
                <CardTitle className="text-lg">{req.itemName}</CardTitle>
                <CardDescription>{req.kode}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={student?.foto || "/placeholder.svg"} />
                    <AvatarFallback>{student?.nama.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{student?.nama}</p>
                    <p className="text-xs text-muted-foreground">{student?.nim} - {student?.prodi}</p>
                  </div>
                </div>
                
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Mulai:</span>
                    <span>{new Date(req.tanggalPinjam).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Selesai:</span>
                    <span>{new Date(req.tanggalKembali).toLocaleString()}</span>
                  </div>
                </div>

                <div className="bg-muted p-3 rounded-md text-sm">
                  <p className="font-medium mb-1">Keperluan:</p>
                  <p className="text-muted-foreground">{req.keperluan}</p>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2 pt-0">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive" className="flex-1" onClick={() => setSelectedId(req.id)}>
                      <X className="mr-2 size-4" /> Tolak
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Tolak Peminjaman</DialogTitle>
                      <DialogDescription>
                        Berikan alasan penolakan untuk diberitahukan kepada mahasiswa.
                      </DialogDescription>
                    </DialogHeader>
                    <Textarea 
                      placeholder="Contoh: Ruangan sedang maintenance, Barang tidak tersedia, dll."
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                    />
                    <DialogFooter>
                      <Button variant="destructive" onClick={handleReject}>Konfirmasi Penolakan</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => handleApprove(req.id)}>
                  <Check className="mr-2 size-4" /> Setujui
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>

      {requests.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <CheckCircle2 className="mx-auto size-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">Semua Bersih!</h3>
          <p className="text-muted-foreground">Tidak ada permintaan peminjaman yang menunggu validasi.</p>
        </div>
      )}
    </div>
  )
}
