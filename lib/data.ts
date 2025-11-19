// Data types
export type UserRole = 'user' | 'admin'

export type RoomStatus = 'Tersedia' | 'Dipinjam' | 'Maintenance'
export type ItemCondition = 'Baik' | 'Rusak Ringan' | 'Rusak Berat'
export type BorrowStatus = 'Pending' | 'Disetujui' | 'Ditolak' | 'Berlangsung' | 'Selesai' | 'Terlambat'
export type StudentStatus = 'Aktif' | 'Tidak Aktif' | 'Suspend'

export interface Room {
  id: string
  kode: string
  nama: string
  gedung: string
  lantai: number
  kapasitas: number
  fasilitas: string[]
  status: RoomStatus
  foto: string
}

export interface Item {
  id: string
  kode: string
  nama: string
  kategori: string
  jumlah_tersedia: number
  jumlah_total: number
  kondisi: ItemCondition
  foto: string
  lokasi: string
}

export interface Student {
  id: string
  nim: string
  nama: string
  email: string
  prodi: string
  angkatan: number
  status: StudentStatus
  foto: string
  noWhatsapp?: string
}

export interface Borrowing {
  id: string
  kode: string
  userId: string
  jenis: 'Ruangan' | 'Barang'
  itemId: string
  itemName: string
  tanggalPinjam: string
  tanggalKembali: string
  keperluan: string
  status: BorrowStatus
  feedback?: string
  createdAt: string
}

// Dummy Data
export const rooms: Room[] = [
  {
    id: '1',
    kode: 'RG-A301',
    nama: 'Ruang Kelas A301',
    gedung: 'Gedung A',
    lantai: 3,
    kapasitas: 40,
    fasilitas: ['Proyektor', 'AC', 'Whiteboard', 'Sound System'],
    status: 'Tersedia',
    foto: '/modern-classroom.jpg'
  },
  {
    id: '2',
    kode: 'RG-B201',
    nama: 'Lab Komputer B201',
    gedung: 'Gedung B',
    lantai: 2,
    kapasitas: 30,
    fasilitas: ['Proyektor', 'AC', '30 PC', 'Whiteboard'],
    status: 'Tersedia',
    foto: '/computer-lab.png'
  },
  {
    id: '3',
    kode: 'RG-C101',
    nama: 'Aula Serbaguna',
    gedung: 'Gedung C',
    lantai: 1,
    kapasitas: 200,
    fasilitas: ['Proyektor', 'AC', 'Sound System', 'Panggung', 'Kursi Lipat'],
    status: 'Dipinjam',
    foto: '/auditorium-hall.jpg'
  },
  {
    id: '4',
    kode: 'RG-A401',
    nama: 'Ruang Seminar A401',
    gedung: 'Gedung A',
    lantai: 4,
    kapasitas: 50,
    fasilitas: ['Proyektor', 'AC', 'Whiteboard', 'Meja Bundar'],
    status: 'Tersedia',
    foto: '/seminar-room.png'
  },
  {
    id: '5',
    kode: 'RG-B301',
    nama: 'Lab Jaringan B301',
    gedung: 'Gedung B',
    lantai: 3,
    kapasitas: 25,
    fasilitas: ['Proyektor', 'AC', 'Router', 'Switch', 'Kabel UTP'],
    status: 'Maintenance',
    foto: '/network-lab.jpg'
  },
  {
    id: '6',
    kode: 'RG-A201',
    nama: 'Ruang Kelas A201',
    gedung: 'Gedung A',
    lantai: 2,
    kapasitas: 35,
    fasilitas: ['Proyektor', 'AC', 'Whiteboard'],
    status: 'Tersedia',
    foto: '/diverse-classroom.png'
  },
  {
    id: '7',
    kode: 'RG-C201',
    nama: 'Ruang Rapat C201',
    gedung: 'Gedung C',
    lantai: 2,
    kapasitas: 20,
    fasilitas: ['Proyektor', 'AC', 'Whiteboard', 'Meja Konferensi'],
    status: 'Tersedia',
    foto: '/modern-meeting-room.png'
  },
  {
    id: '8',
    kode: 'RG-B101',
    nama: 'Lab Multimedia B101',
    gedung: 'Gedung B',
    lantai: 1,
    kapasitas: 30,
    fasilitas: ['Proyektor', 'AC', 'iMac', 'Tablet Grafis', 'Green Screen'],
    status: 'Tersedia',
    foto: '/multimedia-lab.jpg'
  },
  {
    id: '9',
    kode: 'RG-A101',
    nama: 'Perpustakaan',
    gedung: 'Gedung A',
    lantai: 1,
    kapasitas: 100,
    fasilitas: ['AC', 'Rak Buku', 'Meja Baca', 'WiFi'],
    status: 'Tersedia',
    foto: '/grand-library.png'
  },
  {
    id: '10',
    kode: 'RG-C301',
    nama: 'Ruang Diskusi C301',
    gedung: 'Gedung C',
    lantai: 3,
    kapasitas: 15,
    fasilitas: ['Whiteboard', 'AC', 'Sofa', 'TV'],
    status: 'Tersedia',
    foto: '/discussion-room.jpg'
  }
]

export const items: Item[] = [
  {
    id: '1',
    kode: 'BRG-LP001',
    nama: 'Laptop Asus ROG',
    kategori: 'Elektronik',
    jumlah_tersedia: 3,
    jumlah_total: 5,
    kondisi: 'Baik',
    foto: '/gaming-laptop.png',
    lokasi: 'Gudang A'
  },
  {
    id: '2',
    kode: 'BRG-PR001',
    nama: 'Proyektor Epson',
    kategori: 'Elektronik',
    jumlah_tersedia: 5,
    jumlah_total: 8,
    kondisi: 'Baik',
    foto: '/home-theater-projector.png',
    lokasi: 'Gudang A'
  },
  {
    id: '3',
    kode: 'BRG-KM001',
    nama: 'Kamera DSLR Canon',
    kategori: 'Elektronik',
    jumlah_tersedia: 2,
    jumlah_total: 3,
    kondisi: 'Baik',
    foto: '/dslr-camera.png',
    lokasi: 'Gudang B'
  },
  {
    id: '4',
    kode: 'BRG-BV001',
    nama: 'Bola Voli Mikasa',
    kategori: 'Olahraga',
    jumlah_tersedia: 8,
    jumlah_total: 10,
    kondisi: 'Baik',
    foto: '/volleyball-game.png',
    lokasi: 'Gudang Olahraga'
  },
  {
    id: '5',
    kode: 'BRG-BB001',
    nama: 'Bola Basket Spalding',
    kategori: 'Olahraga',
    jumlah_tersedia: 6,
    jumlah_total: 8,
    kondisi: 'Baik',
    foto: '/basketball-action.png',
    lokasi: 'Gudang Olahraga'
  },
  {
    id: '6',
    kode: 'BRG-MK001',
    nama: 'Microphone Wireless',
    kategori: 'Elektronik',
    jumlah_tersedia: 4,
    jumlah_total: 6,
    kondisi: 'Baik',
    foto: '/wireless-microphone.png',
    lokasi: 'Gudang A'
  },
  {
    id: '7',
    kode: 'BRG-SP001',
    nama: 'Speaker Portable JBL',
    kategori: 'Elektronik',
    jumlah_tersedia: 3,
    jumlah_total: 5,
    kondisi: 'Baik',
    foto: '/portable-speaker.png',
    lokasi: 'Gudang A'
  },
  {
    id: '8',
    kode: 'BRG-TP001',
    nama: 'Tenda Pramuka',
    kategori: 'Outdoor',
    jumlah_tersedia: 5,
    jumlah_total: 10,
    kondisi: 'Baik',
    foto: '/camping-tent.png',
    lokasi: 'Gudang C'
  },
  {
    id: '9',
    kode: 'BRG-WB001',
    nama: 'Whiteboard Portable',
    kategori: 'Alat Tulis',
    jumlah_tersedia: 4,
    jumlah_total: 6,
    kondisi: 'Baik',
    foto: '/portable-whiteboard.jpg',
    lokasi: 'Gudang B'
  },
  {
    id: '10',
    kode: 'BRG-EX001',
    nama: 'Extension Cable 10m',
    kategori: 'Elektronik',
    jumlah_tersedia: 10,
    jumlah_total: 15,
    kondisi: 'Baik',
    foto: '/extension-cable.jpg',
    lokasi: 'Gudang A'
  },
  {
    id: '11',
    kode: 'BRG-TR001',
    nama: 'Tripod Kamera',
    kategori: 'Elektronik',
    jumlah_tersedia: 3,
    jumlah_total: 5,
    kondisi: 'Baik',
    foto: '/camera-tripod.jpg',
    lokasi: 'Gudang B'
  },
  {
    id: '12',
    kode: 'BRG-BS001',
    nama: 'Bola Sepak Nike',
    kategori: 'Olahraga',
    jumlah_tersedia: 7,
    jumlah_total: 10,
    kondisi: 'Baik',
    foto: '/classic-soccer-ball.png',
    lokasi: 'Gudang Olahraga'
  },
  {
    id: '13',
    kode: 'BRG-TB001',
    nama: 'Tablet Wacom',
    kategori: 'Elektronik',
    jumlah_tersedia: 2,
    jumlah_total: 4,
    kondisi: 'Baik',
    foto: '/drawing-tablet.jpg',
    lokasi: 'Gudang A'
  },
  {
    id: '14',
    kode: 'BRG-KS001',
    nama: 'Kursi Lipat',
    kategori: 'Furniture',
    jumlah_tersedia: 50,
    jumlah_total: 100,
    kondisi: 'Baik',
    foto: '/folding-chair.jpg',
    lokasi: 'Gudang C'
  },
  {
    id: '15',
    kode: 'BRG-MJ001',
    nama: 'Meja Lipat',
    kategori: 'Furniture',
    jumlah_tersedia: 20,
    jumlah_total: 30,
    kondisi: 'Baik',
    foto: '/folding-table.jpg',
    lokasi: 'Gudang C'
  }
]

export const students: Student[] = [
  {
    id: '1',
    nim: '2021010001',
    nama: 'Ahmad Fauzi',
    email: 'ahmad@mahasiswa.stitek.ac.id',
    prodi: 'Teknik Informatika',
    angkatan: 2021,
    status: 'Aktif',
    foto: '/male-student-1.jpg',
    noWhatsapp: '081234567801'
  },
  {
    id: '2',
    nim: '2021010002',
    nama: 'Siti Nurhaliza',
    email: 'siti@mahasiswa.stitek.ac.id',
    prodi: 'Teknik Informatika',
    angkatan: 2021,
    status: 'Aktif',
    foto: '/female-student-1.jpg',
    noWhatsapp: '081234567802'
  },
  {
    id: '3',
    nim: '2022010003',
    nama: 'Budi Santoso',
    email: 'budi@mahasiswa.stitek.ac.id',
    prodi: 'Sistem Informasi',
    angkatan: 2022,
    status: 'Aktif',
    foto: '/male-student-2.png',
    noWhatsapp: '081234567803'
  },
  {
    id: '4',
    nim: '2022010004',
    nama: 'Dewi Lestari',
    email: 'dewi@mahasiswa.stitek.ac.id',
    prodi: 'Teknik Informatika',
    angkatan: 2022,
    status: 'Suspend',
    noWhatsapp: '081234567804',
    foto: '/female-student-2.png'
  },
  {
    id: '5',
    nim: '2023010005',
    nama: 'Eko Prasetyo',
    email: 'eko@mahasiswa.stitek.ac.id',
    prodi: 'Teknik Informatika',
    angkatan: 2023,
    status: 'Aktif',
    foto: '/male-student-3.jpg',
    noWhatsapp: '081234567805'
  },
  {
    id: '6',
    nim: '2023010006',
    nama: 'Fitri Handayani',
    email: 'fitri@mahasiswa.stitek.ac.id',
    prodi: 'Sistem Informasi',
    angkatan: 2023,
    status: 'Aktif',
    foto: '/female-student-3.png',
    noWhatsapp: '081234567806'
  },
  {
    id: '7',
    nim: '2021010007',
    nama: 'Gilang Ramadhan',
    email: 'gilang@mahasiswa.stitek.ac.id',
    prodi: 'Teknik Informatika',
    angkatan: 2021,
    status: 'Aktif',
    foto: '/male-student-4.jpg',
    noWhatsapp: '081234567807'
  },
  {
    id: '8',
    nim: '2022010008',
    nama: 'Hana Pertiwi',
    email: 'hana@mahasiswa.stitek.ac.id',
    prodi: 'Sistem Informasi',
    angkatan: 2022,
    status: 'Aktif',
    foto: '/female-student-4.jpg',
    noWhatsapp: '081234567808'
  },
  {
    id: '9',
    nim: '2023010009',
    nama: 'Irfan Hakim',
    email: 'irfan@mahasiswa.stitek.ac.id',
    prodi: 'Teknik Informatika',
    angkatan: 2023,
    status: 'Aktif',
    foto: '/male-student-5.jpg',
    noWhatsapp: '081234567809'
  },
  {
    id: '10',
    nim: '2021010010',
    nama: 'Julia Safitri',
    email: 'julia@mahasiswa.stitek.ac.id',
    prodi: 'Sistem Informasi',
    angkatan: 2021,
    status: 'Aktif',
    foto: '/female-student-5.jpg',
    noWhatsapp: '081234567810'
  },
  {
    id: '11',
    nim: '2022010011',
    nama: 'Kurniawan Adi',
    email: 'kurniawan@mahasiswa.stitek.ac.id',
    prodi: 'Teknik Informatika',
    angkatan: 2022,
    status: 'Aktif',
    foto: '/male-student-6.jpg',
    noWhatsapp: '081234567811'
  },
  {
    id: '12',
    nim: '2023010012',
    nama: 'Lina Marlina',
    email: 'lina@mahasiswa.stitek.ac.id',
    prodi: 'Sistem Informasi',
    angkatan: 2023,
    status: 'Aktif',
    foto: '/placeholder.svg?height=100&width=100',
    noWhatsapp: '081234567812'
  },
  {
    id: '13',
    nim: '2021010013',
    nama: 'Muhammad Rizki',
    email: 'rizki@mahasiswa.stitek.ac.id',
    prodi: 'Teknik Informatika',
    angkatan: 2021,
    status: 'Tidak Aktif',
    foto: '/placeholder.svg?height=100&width=100',
    noWhatsapp: '081234567813'
  },
  {
    id: '14',
    nim: '2022010014',
    nama: 'Nur Azizah',
    email: 'azizah@mahasiswa.stitek.ac.id',
    prodi: 'Sistem Informasi',
    angkatan: 2022,
    status: 'Aktif',
    foto: '/placeholder.svg?height=100&width=100',
    noWhatsapp: '081234567814'
  },
  {
    id: '15',
    nim: '2023010015',
    nama: 'Omar Abdullah',
    email: 'omar@mahasiswa.stitek.ac.id',
    prodi: 'Teknik Informatika',
    angkatan: 2023,
    status: 'Aktif',
    foto: '/placeholder.svg?height=100&width=100',
    noWhatsapp: '081234567815'
  },
  {
    id: '16',
    nim: '2021010016',
    nama: 'Putri Wulandari',
    email: 'putri@mahasiswa.stitek.ac.id',
    prodi: 'Sistem Informasi',
    angkatan: 2021,
    status: 'Aktif',
    foto: '/placeholder.svg?height=100&width=100',
    noWhatsapp: '081234567816'
  },
  {
    id: '17',
    nim: '2022010017',
    nama: 'Qori Maulana',
    email: 'qori@mahasiswa.stitek.ac.id',
    prodi: 'Teknik Informatika',
    angkatan: 2022,
    status: 'Aktif',
    foto: '/placeholder.svg?height=100&width=100',
    noWhatsapp: '081234567817'
  },
  {
    id: '18',
    nim: '2023010018',
    nama: 'Rina Susanti',
    email: 'rina@mahasiswa.stitek.ac.id',
    prodi: 'Sistem Informasi',
    angkatan: 2023,
    status: 'Aktif',
    foto: '/placeholder.svg?height=100&width=100',
    noWhatsapp: '081234567818'
  },
  {
    id: '19',
    nim: '2021010019',
    nama: 'Satria Wijaya',
    email: 'satria@mahasiswa.stitek.ac.id',
    prodi: 'Teknik Informatika',
    angkatan: 2021,
    status: 'Aktif',
    foto: '/placeholder.svg?height=100&width=100',
    noWhatsapp: '081234567819'
  },
  {
    id: '20',
    nim: '2022010020',
    nama: 'Tari Anggraini',
    email: 'tari@mahasiswa.stitek.ac.id',
    prodi: 'Sistem Informasi',
    angkatan: 2022,
    status: 'Aktif',
    foto: '/placeholder.svg?height=100&width=100',
    noWhatsapp: '081234567820'
  }
]

export const borrowings: Borrowing[] = [
  {
    id: '1',
    kode: 'PJM-2025-001',
    userId: '1',
    jenis: 'Ruangan',
    itemId: '1',
    itemName: 'Ruang Kelas A301',
    tanggalPinjam: '2025-01-15T08:00',
    tanggalKembali: '2025-01-15T12:00',
    keperluan: 'Seminar Teknologi AI',
    status: 'Disetujui',
    createdAt: '2025-01-10T10:00'
  },
  {
    id: '2',
    kode: 'PJM-2025-002',
    userId: '2',
    jenis: 'Barang',
    itemId: '1',
    itemName: 'Laptop Asus ROG',
    tanggalPinjam: '2025-01-16T09:00',
    tanggalKembali: '2025-01-18T16:00',
    keperluan: 'Tugas Akhir - Rendering Video',
    status: 'Berlangsung',
    createdAt: '2025-01-14T14:30'
  },
  {
    id: '3',
    kode: 'PJM-2025-003',
    userId: '3',
    jenis: 'Ruangan',
    itemId: '3',
    itemName: 'Aula Serbaguna',
    tanggalPinjam: '2025-01-20T13:00',
    tanggalKembali: '2025-01-20T17:00',
    keperluan: 'Acara Wisuda',
    status: 'Pending',
    createdAt: '2025-01-15T09:00'
  },
  {
    id: '4',
    kode: 'PJM-2025-004',
    userId: '5',
    jenis: 'Barang',
    itemId: '3',
    itemName: 'Kamera DSLR Canon',
    tanggalPinjam: '2025-01-12T08:00',
    tanggalKembali: '2025-01-14T16:00',
    keperluan: 'Dokumentasi Event Kampus',
    status: 'Selesai',
    createdAt: '2025-01-10T11:00'
  },
  {
    id: '5',
    kode: 'PJM-2025-005',
    userId: '7',
    jenis: 'Barang',
    itemId: '2',
    itemName: 'Proyektor Epson',
    tanggalPinjam: '2025-01-17T10:00',
    tanggalKembali: '2025-01-17T14:00',
    keperluan: 'Presentasi Proposal',
    status: 'Disetujui',
    createdAt: '2025-01-15T16:00'
  },
  {
    id: '6',
    kode: 'PJM-2025-006',
    userId: '9',
    jenis: 'Ruangan',
    itemId: '7',
    itemName: 'Ruang Rapat C201',
    tanggalPinjam: '2025-01-18T09:00',
    tanggalKembali: '2025-01-18T11:00',
    keperluan: 'Rapat Organisasi',
    status: 'Ditolak',
    feedback: 'Ruangan sudah dibooking untuk acara lain',
    createdAt: '2025-01-16T10:00'
  },
  {
    id: '7',
    kode: 'PJM-2025-007',
    userId: '11',
    jenis: 'Barang',
    itemId: '4',
    itemName: 'Bola Voli Mikasa',
    tanggalPinjam: '2025-01-10T15:00',
    tanggalKembali: '2025-01-12T17:00',
    keperluan: 'Turnamen Voli Antar Kelas',
    status: 'Terlambat',
    createdAt: '2025-01-08T13:00'
  },
  {
    id: '8',
    kode: 'PJM-2025-008',
    userId: '15',
    jenis: 'Barang',
    itemId: '6',
    itemName: 'Microphone Wireless',
    tanggalPinjam: '2025-01-19T08:00',
    tanggalKembali: '2025-01-19T12:00',
    keperluan: 'Podcast Mahasiswa',
    status: 'Pending',
    createdAt: '2025-01-17T14:00'
  },
  {
    id: '9',
    kode: 'PJM-2025-009',
    userId: '17',
    jenis: 'Ruangan',
    itemId: '2',
    itemName: 'Lab Komputer B201',
    tanggalPinjam: '2025-01-21T13:00',
    tanggalKembali: '2025-01-21T16:00',
    keperluan: 'Workshop Web Development',
    status: 'Disetujui',
    createdAt: '2025-01-18T09:30'
  },
  {
    id: '10',
    kode: 'PJM-2025-010',
    userId: '19',
    jenis: 'Barang',
    itemId: '7',
    itemName: 'Speaker Portable JBL',
    tanggalPinjam: '2025-01-22T10:00',
    tanggalKembali: '2025-01-22T15:00',
    keperluan: 'Acara Musik Kampus',
    status: 'Pending',
    createdAt: '2025-01-19T11:00'
  }
]

// Helper functions
export function getRoomById(id: string): Room | undefined {
  return rooms.find(room => room.id === id)
}

export function getItemById(id: string): Item | undefined {
  return items.find(item => item.id === id)
}

export function getStudentById(id: string): Student | undefined {
  return students.find(student => student.id === id)
}

export function getBorrowingsByUserId(userId: string): Borrowing[] {
  return borrowings.filter(b => b.userId === userId)
}

export function getAvailableRooms(): Room[] {
  return rooms.filter(room => room.status === 'Tersedia')
}

export function getAvailableItems(): Item[] {
  return items.filter(item => item.jumlah_tersedia > 0)
}
