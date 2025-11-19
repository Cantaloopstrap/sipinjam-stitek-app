'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangle, Calendar } from 'lucide-react'

export default function SchedulePage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Jadwal & Tata Tertib</h2>
        <p className="text-muted-foreground">Informasi jadwal akademik dan aturan peminjaman</p>
      </div>

      <Tabs defaultValue="rules" className="w-full">
        <TabsList>
          <TabsTrigger value="rules">Tata Tertib</TabsTrigger>
          <TabsTrigger value="academic">Kalender Akademik</TabsTrigger>
        </TabsList>

        <TabsContent value="rules" className="mt-4 space-y-6">
          <Alert variant="destructive">
            <AlertTriangle className="size-4" />
            <AlertTitle>Penting!</AlertTitle>
            <AlertDescription>
              Pelanggaran terhadap tata tertib dapat dikenakan sanksi berupa penangguhan akun (suspend) hingga sanksi akademik.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>Prosedur & Ketentuan Peminjaman</CardTitle>
              <CardDescription>Harap dibaca dan dipahami sebelum melakukan peminjaman</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Syarat Peminjaman</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Peminjam harus berstatus mahasiswa aktif STITEK Bontang.</li>
                      <li>Memiliki KTM (Kartu Tanda Mahasiswa) yang berlaku.</li>
                      <li>Tidak sedang dalam masa sanksi atau suspend.</li>
                      <li>Mengajukan permohonan minimal H-1 sebelum penggunaan.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Durasi & Batas Waktu</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Peminjaman ruangan maksimal 4 jam per sesi.</li>
                      <li>Peminjaman barang maksimal 3 hari.</li>
                      <li>Pengembalian barang harus sesuai dengan tanggal yang disetujui.</li>
                      <li>Keterlambatan pengembalian akan dikenakan denda atau sanksi.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Tanggung Jawab Peminjam</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Menjaga kebersihan dan kerapian ruangan yang dipinjam.</li>
                      <li>Menjaga kondisi barang agar tidak rusak atau hilang.</li>
                      <li>Melaporkan jika ada kerusakan sebelum penggunaan.</li>
                      <li>Mengganti kerugian jika terjadi kerusakan atau kehilangan akibat kelalaian.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Sanksi Pelanggaran</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Terlambat mengembalikan: Suspend akun 3 hari.</li>
                      <li>Merusak fasilitas: Wajib ganti rugi & suspend akun 1 minggu.</li>
                      <li>Menghilangkan barang: Wajib ganti barang sejenis & suspend akun 2 minggu.</li>
                      <li>Pelanggaran berat: Sanksi akademik sesuai aturan kemahasiswaan.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="academic" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Kalender Akademik Semester Ganjil 2025/2026</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <Calendar className="size-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Masa Perkuliahan</h4>
                    <p className="text-sm text-muted-foreground">1 September 2025 - 20 Desember 2025</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <Calendar className="size-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Ujian Tengah Semester (UTS)</h4>
                    <p className="text-sm text-muted-foreground">20 Oktober 2025 - 25 Oktober 2025</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <Calendar className="size-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Ujian Akhir Semester (UAS)</h4>
                    <p className="text-sm text-muted-foreground">22 Desember 2025 - 3 Januari 2026</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="bg-red-100 p-3 rounded-full text-red-600">
                    <Calendar className="size-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Libur Semester</h4>
                    <p className="text-sm text-muted-foreground">5 Januari 2026 - 31 Januari 2026</p>
                    <p className="text-xs text-red-500 mt-1">*Tidak ada layanan peminjaman selama libur semester</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
