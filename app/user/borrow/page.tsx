'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { rooms, items } from '@/lib/data'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'sonner'
import { CalendarIcon, CheckCircle2, AlertCircle } from 'lucide-react'

export default function BorrowPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user } = useAuth()
  
  const initialType = searchParams.get('type') as 'room' | 'item' | null
  const initialId = searchParams.get('id')
  
  const [step, setStep] = useState(1)
  const [type, setType] = useState<'room' | 'item'>(initialType || 'room')
  const [selectedId, setSelectedId] = useState(initialId || '')
  const [startDate, setStartDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endDate, setEndDate] = useState('')
  const [endTime, setEndTime] = useState('')
  const [purpose, setPurpose] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [agreed, setAgreed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Reset selected ID if type changes
  useEffect(() => {
    if (step === 1 && type !== initialType) {
      setSelectedId('')
    }
  }, [type, step, initialType])

  const handleNext = () => {
    if (step === 1) {
      setStep(2)
    } else if (step === 2) {
      if (!selectedId || !startDate || !startTime || !endDate || !endTime || !purpose) {
        toast.error('Mohon lengkapi semua data')
        return
      }
      setStep(3)
    }
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleSubmit = async () => {
    if (!agreed) {
      toast.error('Anda harus menyetujui tata tertib peminjaman')
      return
    }

    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    toast.success('Pengajuan peminjaman berhasil dikirim!')
    router.push('/user/history')
  }

  const getSelectedItemName = () => {
    if (type === 'room') {
      return rooms.find(r => r.id === selectedId)?.nama || 'Ruangan tidak ditemukan'
    } else {
      return items.find(i => i.id === selectedId)?.nama || 'Barang tidak ditemukan'
    }
  }

  if (user?.status === 'Suspend' || user?.status === 'Tidak Aktif') {
    return (
      <div className="max-w-3xl mx-auto py-12 text-center">
        <div className="bg-red-100 text-red-600 p-4 rounded-full inline-flex mb-4">
          <AlertCircle className="size-8" />
        </div>
        <h2 className="text-2xl font-bold text-red-600 mb-2">Akun Ditangguhkan</h2>
        <p className="text-muted-foreground mb-6">
          Maaf, akun Anda sedang dalam masa sanksi atau tidak aktif.<br/>
          Anda tidak dapat melakukan peminjaman saat ini.
        </p>
        <Button variant="outline" onClick={() => router.push('/user/dashboard')}>
          Kembali ke Dashboard
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto py-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight mb-2">Form Peminjaman</h2>
        <p className="text-muted-foreground">Silahkan lengkapi data peminjaman di bawah ini.</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-muted -z-10"></div>
        <div className={`flex flex-col items-center gap-2 bg-background px-2 ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
          <div className={`size-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>1</div>
          <span className="text-xs font-medium">Jenis</span>
        </div>
        <div className={`flex flex-col items-center gap-2 bg-background px-2 ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
          <div className={`size-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>2</div>
          <span className="text-xs font-medium">Detail</span>
        </div>
        <div className={`flex flex-col items-center gap-2 bg-background px-2 ${step >= 3 ? 'text-primary' : 'text-muted-foreground'}`}>
          <div className={`size-8 rounded-full flex items-center justify-center border-2 ${step >= 3 ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>3</div>
          <span className="text-xs font-medium">Konfirmasi</span>
        </div>
      </div>

      <Card>
        {step === 1 && (
          <>
            <CardHeader>
              <CardTitle>Pilih Jenis Peminjaman</CardTitle>
              <CardDescription>Apa yang ingin Anda pinjam?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup value={type} onValueChange={(val) => setType(val as 'room' | 'item')} className="grid grid-cols-2 gap-4">
                <div>
                  <RadioGroupItem value="room" id="room" className="peer sr-only" />
                  <Label
                    htmlFor="room"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <span className="text-lg font-semibold mb-2">Ruangan</span>
                    <span className="text-sm text-center text-muted-foreground">Kelas, Lab, Aula, dll</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="item" id="item" className="peer sr-only" />
                  <Label
                    htmlFor="item"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <span className="text-lg font-semibold mb-2">Barang</span>
                    <span className="text-sm text-center text-muted-foreground">Proyektor, Kabel, dll</span>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleNext}>Lanjut</Button>
            </CardFooter>
          </>
        )}

        {step === 2 && (
          <>
            <CardHeader>
              <CardTitle>Detail Peminjaman</CardTitle>
              <CardDescription>Lengkapi informasi peminjaman</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Pilih {type === 'room' ? 'Ruangan' : 'Barang'}</Label>
                <Select value={selectedId} onValueChange={setSelectedId}>
                  <SelectTrigger>
                    <SelectValue placeholder={`Pilih ${type === 'room' ? 'Ruangan' : 'Barang'}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {type === 'room' ? (
                      rooms.filter(r => r.status === 'Tersedia').map(room => (
                        <SelectItem key={room.id} value={room.id}>{room.nama}</SelectItem>
                      ))
                    ) : (
                      items.filter(i => i.jumlah_tersedia > 0).map(item => (
                        <SelectItem key={item.id} value={item.id}>{item.nama} (Sisa: {item.jumlah_tersedia})</SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              {type === 'item' && (
                <div className="space-y-2">
                  <Label>Jumlah</Label>
                  <Input 
                    type="number" 
                    min={1} 
                    max={items.find(i => i.id === selectedId)?.jumlah_tersedia || 1}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tanggal Mulai</Label>
                  <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Jam Mulai</Label>
                  <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tanggal Selesai</Label>
                  <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Jam Selesai</Label>
                  <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Keperluan</Label>
                <Textarea 
                  placeholder="Jelaskan tujuan peminjaman..." 
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Upload Surat Pengantar (Opsional)</Label>
                <Input type="file" />
                <p className="text-xs text-muted-foreground">Format PDF/JPG, maks 2MB</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>Kembali</Button>
              <Button onClick={handleNext}>Lanjut</Button>
            </CardFooter>
          </>
        )}

        {step === 3 && (
          <>
            <CardHeader>
              <CardTitle>Konfirmasi Peminjaman</CardTitle>
              <CardDescription>Periksa kembali data sebelum mengirim</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border p-4 space-y-3 bg-muted/30">
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <span className="text-muted-foreground">Peminjam:</span>
                  <span className="col-span-2 font-medium">{user?.nama} ({user?.nim})</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <span className="text-muted-foreground">Item:</span>
                  <span className="col-span-2 font-medium">{getSelectedItemName()}</span>
                </div>
                {type === 'item' && (
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <span className="text-muted-foreground">Jumlah:</span>
                    <span className="col-span-2 font-medium">{quantity} unit</span>
                  </div>
                )}
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <span className="text-muted-foreground">Waktu:</span>
                  <span className="col-span-2 font-medium">
                    {startDate} {startTime} s/d {endDate} {endTime}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <span className="text-muted-foreground">Keperluan:</span>
                  <span className="col-span-2 font-medium">{purpose}</span>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox id="terms" checked={agreed} onCheckedChange={(c) => setAgreed(c as boolean)} />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Saya menyetujui tata tertib peminjaman
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Saya bertanggung jawab penuh atas fasilitas yang dipinjam dan akan mengembalikannya tepat waktu.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack} disabled={isSubmitting}>Kembali</Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? 'Mengirim...' : 'Kirim Pengajuan'}
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  )
}
