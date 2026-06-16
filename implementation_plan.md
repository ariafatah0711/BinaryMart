# 📦 BinaryMart — Dokumen Perencanaan Proyek

> **Mata Kuliah:** Struktur Data dan Algoritma (SDA)  
> **Nama Aplikasi:** BinaryMart  
> **Versi Dokumen:** 1.0  
> **Tanggal:** 16 Juni 2026  
> **Status:** Draft — Menunggu Persetujuan

---

# Daftar Isi

1. [Gambaran Umum Sistem](#1-gambaran-umum-sistem)
2. [Analisis Kebutuhan](#2-analisis-kebutuhan)
3. [User Role](#3-user-role)
4. [Use Case Diagram Planning](#4-use-case-diagram-planning)
5. [User Flow](#5-user-flow)
6. [Struktur Data](#6-struktur-data)
7. [Desain Binary Search Tree](#7-desain-binary-search-tree)
8. [Desain Quick Sort](#8-desain-quick-sort)
9. [Database Design](#9-database-design)
10. [Arsitektur Sistem](#10-arsitektur-sistem)
11. [Struktur Folder Project](#11-struktur-folder-project)
12. [Daftar Halaman (Pages)](#12-daftar-halaman-pages)
13. [Komponen UI](#13-komponen-ui)
14. [API Planning](#14-api-planning)
15. [Deployment Planning](#15-deployment-planning)
16. [Testing Planning](#16-testing-planning)
17. [Risiko dan Mitigasi](#17-risiko-dan-mitigasi)
18. [Pembagian Tugas Tim](#18-pembagian-tugas-tim)
19. [Timeline Proyek](#19-timeline-proyek)
20. [Rekomendasi Final](#20-rekomendasi-final)

---

# 1. Gambaran Umum Sistem

## 1.1 Apa itu BinaryMart?

BinaryMart adalah **sistem katalog produk elektronik berbasis web** yang dirancang sebagai proyek akhir mata kuliah Struktur Data dan Algoritma. Aplikasi ini memungkinkan pengguna untuk mencari, melihat, mengurutkan, dan mengelola data produk elektronik secara efisien menggunakan struktur data **Binary Search Tree (BST)** dan algoritma **Quick Sort** yang diimplementasikan secara manual (bukan built-in).

Kategori produk yang dicakup:
- 💻 Laptop
- 📱 Smartphone
- 🖥️ Monitor
- ⌨️ Keyboard
- 🖱️ Mouse
- 🎧 Headset
- 🔧 Komponen Komputer (RAM, SSD, GPU, Motherboard, PSU, dll.)

## 1.2 Permasalahan yang Ingin Diselesaikan

| No | Masalah | Solusi BinaryMart |
|----|---------|-------------------|
| 1 | Pencarian produk pada dataset besar membutuhkan waktu lama jika dilakukan secara linear | Menggunakan BST untuk pencarian $O(\log n)$ pada kondisi rata-rata |
| 2 | Pengurutan data produk berdasarkan berbagai kriteria membutuhkan algoritma yang efisien | Menggunakan Quick Sort manual dengan kompleksitas rata-rata $O(n \log n)$ |
| 3 | Tidak adanya platform terpusat untuk menelusuri dan membandingkan produk elektronik | Menyediakan katalog web yang responsif dan mudah digunakan |
| 4 | Kurangnya implementasi nyata dari konsep SDA dalam proyek aplikatif | Mengintegrasikan BST dan Quick Sort sebagai inti logika sistem |

## 1.3 Target Pengguna

| Pengguna | Deskripsi |
|----------|-----------|
| **Mahasiswa / Pengajar** | Ingin melihat penerapan SDA dalam proyek nyata |
| **Konsumen Umum** | Ingin mencari dan membandingkan produk elektronik |
| **Admin / Pengelola Toko** | Mengelola data produk (CRUD) |

## 1.4 Manfaat Sistem

1. **Akademis:** Membuktikan pemahaman konsep BST dan Quick Sort melalui implementasi nyata.
2. **Praktis:** Menyediakan katalog produk elektronik yang terstruktur dan mudah ditelusuri.
3. **Teknis:** Memberikan perbandingan performa BST vs Linear Search dan Quick Sort vs Bubble Sort secara terukur.
4. **Edukatif:** Dokumentasi yang baik sehingga dapat menjadi referensi belajar.

## 1.5 Ruang Lingkup Sistem

**Termasuk dalam ruang lingkup:**
- Katalog produk elektronik (CRUD lengkap oleh admin)
- Pencarian produk menggunakan BST berdasarkan nama dan kategori
- Pengurutan produk menggunakan Quick Sort berdasarkan harga, rating, dan popularitas
- Autentikasi admin sederhana
- Dashboard admin untuk manajemen produk
- Halaman publik untuk melihat dan mencari produk
- Deployment ke Vercel

**Tidak termasuk dalam ruang lingkup:**
- Fitur keranjang belanja (cart) dan checkout
- Pembayaran online
- Sistem notifikasi real-time
- Multi-tenant / multi-toko
- Mobile native app

## 1.6 Batasan Sistem

1. **Skala data:** Dirancang untuk skala kecil–menengah (ratusan hingga ribuan produk).
2. **Single admin model:** Hanya mendukung satu level admin (tanpa hierarki role).
3. **BST di server-side:** BST dibangun di memory server saat runtime, bukan persisted ke disk.
4. **Tidak ada real-time sync:** Jika ada perubahan data oleh admin, BST dibangun ulang (rebuild) dari database.
5. **Autentikasi sederhana:** Menggunakan session/JWT dasar, bukan OAuth/SSO enterprise.

---

# 2. Analisis Kebutuhan

## 2.1 Functional Requirements

| ID | Requirement | Deskripsi | Prioritas |
|----|-------------|-----------|-----------|
| FR-01 | Melihat daftar produk | Pengguna dapat melihat semua produk dalam bentuk grid/list dengan paginasi | **Tinggi** |
| FR-02 | Mencari produk berdasarkan nama | Pengguna mengetik nama produk, sistem mencari menggunakan BST nama | **Tinggi** |
| FR-03 | Mencari produk berdasarkan kategori | Pengguna memilih kategori, sistem mengambil produk dari BST kategori | **Tinggi** |
| FR-04 | Mengurutkan produk berdasarkan harga (asc/desc) | Sistem menggunakan Quick Sort untuk mengurutkan berdasarkan harga | **Tinggi** |
| FR-05 | Mengurutkan produk berdasarkan rating (asc/desc) | Sistem menggunakan Quick Sort untuk mengurutkan berdasarkan rating | **Tinggi** |
| FR-06 | Mengurutkan produk berdasarkan popularitas (asc/desc) | Sistem menggunakan Quick Sort untuk mengurutkan berdasarkan popularitas | **Tinggi** |
| FR-07 | Melihat detail produk | Pengguna mengklik produk untuk melihat informasi lengkap | **Tinggi** |
| FR-08 | Admin login | Admin melakukan autentikasi untuk mengakses dashboard | **Tinggi** |
| FR-09 | Admin menambah produk | Admin mengisi form untuk menambah produk baru ke database + insert ke BST | **Tinggi** |
| FR-10 | Admin mengedit produk | Admin mengubah data produk yang sudah ada, BST di-rebuild jika key berubah | **Tinggi** |
| FR-11 | Admin menghapus produk | Admin menghapus produk dari database + delete dari BST | **Tinggi** |
| FR-12 | Melihat statistik algoritma | Menampilkan waktu eksekusi dan jumlah operasi BST/Quick Sort | **Sedang** |
| FR-13 | Filter kombinasi | Pengguna dapat menggabungkan filter kategori + sorting secara bersamaan | **Sedang** |
| FR-14 | Pencarian prefix (autocomplete) | BST mendukung pencarian berdasarkan awalan nama produk | **Rendah** |
| FR-15 | Visualisasi BST | Menampilkan representasi visual pohon BST untuk keperluan presentasi | **Rendah** |

## 2.2 Non-Functional Requirements

| ID | Requirement | Deskripsi | Metrik Target |
|----|-------------|-----------|---------------|
| NFR-01 | Responsif | Tampilan menyesuaikan ukuran layar (mobile, tablet, desktop) | Breakpoint 640/768/1024/1280px |
| NFR-02 | Mudah digunakan | UI intuitif, navigasi jelas | Pengguna baru dapat mencari produk dalam <30 detik |
| NFR-03 | Performa pencarian | Pencarian BST lebih cepat dari linear search | BST search < 5ms untuk 1000 produk |
| NFR-04 | Performa sorting | Quick Sort lebih cepat dari Bubble Sort | Quick Sort < 10ms untuk 1000 produk |
| NFR-05 | Mudah di-deploy | Satu perintah deploy | `vercel --prod` berhasil tanpa error |
| NFR-06 | Maintainable | Kode terstruktur, modular, dan terdokumentasi | Folder structure sesuai standar Next.js |
| NFR-07 | Scalable (kecil-menengah) | Mendukung hingga ~5000 produk tanpa degradasi signifikan | Response time < 500ms |
| NFR-08 | Keamanan dasar | Admin routes dilindungi autentikasi | Tidak bisa akses dashboard tanpa login |

---

# 3. User Role

## 3.1 Guest / User (Pengunjung)

Pengguna umum yang mengakses aplikasi tanpa perlu login.

**Kemampuan:**
- ✅ Melihat halaman beranda dengan produk unggulan
- ✅ Melihat daftar seluruh produk (katalog)
- ✅ Mencari produk berdasarkan nama (BST search)
- ✅ Memfilter produk berdasarkan kategori (BST category)
- ✅ Mengurutkan produk berdasarkan harga, rating, atau popularitas (Quick Sort)
- ✅ Melihat halaman detail produk
- ✅ Melihat statistik performa algoritma (opsional)
- ❌ Tidak dapat menambah, mengedit, atau menghapus produk

## 3.2 Admin (Pengelola)

Pengguna yang memiliki akses ke dashboard manajemen produk setelah login.

**Kemampuan:**
- ✅ Semua kemampuan Guest/User
- ✅ Login ke sistem admin
- ✅ Melihat dashboard admin (ringkasan statistik produk)
- ✅ Menambah produk baru
- ✅ Mengedit data produk yang ada
- ✅ Menghapus produk
- ✅ Melihat daftar produk dalam format tabel (admin view)
- ✅ Logout dari sistem

> [!NOTE]
> Tidak diperlukan role tambahan (seperti Super Admin atau Editor) karena skala proyek kecil-menengah. Satu level admin sudah cukup.

---

# 4. Use Case Diagram Planning

## 4.1 Daftar Use Case

| No | Actor | Use Case | Deskripsi | Prioritas |
|----|-------|----------|-----------|-----------|
| UC-01 | Guest | Melihat halaman beranda | Melihat landing page dengan produk featured dan ringkasan | Tinggi |
| UC-02 | Guest | Melihat katalog produk | Menelusuri seluruh daftar produk dengan paginasi | Tinggi |
| UC-03 | Guest | Mencari produk by nama | Mengetik keyword, sistem mencari di BST nama | Tinggi |
| UC-04 | Guest | Memfilter produk by kategori | Memilih kategori dari dropdown/sidebar, sistem query BST kategori | Tinggi |
| UC-05 | Guest | Mengurutkan produk | Memilih kriteria sort (harga/rating/popularitas, asc/desc) | Tinggi |
| UC-06 | Guest | Melihat detail produk | Mengklik produk untuk melihat spesifikasi lengkap | Tinggi |
| UC-07 | Guest | Melihat statistik algoritma | Melihat perbandingan performa BST vs Linear, Quick Sort vs Bubble Sort | Sedang |
| UC-08 | Admin | Login | Memasukkan kredensial untuk akses dashboard | Tinggi |
| UC-09 | Admin | Logout | Keluar dari sesi admin | Tinggi |
| UC-10 | Admin | Melihat dashboard | Melihat ringkasan total produk, kategori, statistik | Tinggi |
| UC-11 | Admin | Menambah produk | Mengisi form → data masuk database → insert BST | Tinggi |
| UC-12 | Admin | Mengedit produk | Memilih produk → edit form → update database → rebuild BST jika key berubah | Tinggi |
| UC-13 | Admin | Menghapus produk | Memilih produk → konfirmasi → delete dari database → delete dari BST | Tinggi |
| UC-14 | Admin | Melihat tabel produk | Melihat seluruh produk dalam format tabel dengan aksi edit/delete | Tinggi |
| UC-15 | Guest | Pencarian prefix | Mengetik sebagian nama, mendapat saran produk | Rendah |
| UC-16 | Admin | Melihat visualisasi BST | Melihat representasi pohon BST untuk presentasi | Rendah |

## 4.2 Use Case Diagram (Mermaid)

```mermaid
graph LR
    subgraph Actors
        G["👤 Guest/User"]
        A["🔐 Admin"]
    end

    subgraph "Guest Use Cases"
        UC01["UC-01: Lihat Beranda"]
        UC02["UC-02: Lihat Katalog"]
        UC03["UC-03: Cari by Nama (BST)"]
        UC04["UC-04: Filter by Kategori (BST)"]
        UC05["UC-05: Sort Produk (Quick Sort)"]
        UC06["UC-06: Lihat Detail Produk"]
        UC07["UC-07: Lihat Statistik Algoritma"]
    end

    subgraph "Admin Use Cases"
        UC08["UC-08: Login"]
        UC09["UC-09: Logout"]
        UC10["UC-10: Lihat Dashboard"]
        UC11["UC-11: Tambah Produk"]
        UC12["UC-12: Edit Produk"]
        UC13["UC-13: Hapus Produk"]
        UC14["UC-14: Lihat Tabel Produk"]
    end

    G --- UC01
    G --- UC02
    G --- UC03
    G --- UC04
    G --- UC05
    G --- UC06
    G --- UC07

    A --- UC08
    A --- UC09
    A --- UC10
    A --- UC11
    A --- UC12
    A --- UC13
    A --- UC14
    A --- UC02
    A --- UC03
    A --- UC04
    A --- UC05
    A --- UC06
```

---

# 5. User Flow

## 5.1 Mencari Produk (BST Search by Nama)

```
1. User membuka halaman Katalog Produk (/products)
2. User melihat search bar di bagian atas halaman
3. User mengetikkan nama produk (misal: "ASUS ROG")
4. Sistem mengirim request ke API: GET /api/products/search?name=ASUS+ROG
5. Server menerima query, mencari di BST Nama menggunakan operasi Search
   5a. Jika ditemukan → mengembalikan array produk yang match
   5b. Jika tidak ditemukan → mengembalikan array kosong
6. Frontend menerima response dan menampilkan hasil
   6a. Jika ada hasil → render product cards
   6b. Jika tidak ada → tampilkan pesan "Produk tidak ditemukan"
7. Statistik waktu pencarian BST ditampilkan (opsional)
```

## 5.2 Mengurutkan Produk (Quick Sort)

```
1. User berada di halaman Katalog Produk (/products)
2. User mengklik dropdown "Urutkan berdasarkan"
3. User memilih opsi, misalnya "Harga: Termurah → Termahal"
4. Sistem mengirim request ke API: GET /api/products?sortBy=price&order=asc
5. Server mengambil data produk dari database
6. Server menjalankan Quick Sort pada array produk berdasarkan field 'price' ascending
7. Server mengembalikan array yang sudah terurut
8. Frontend menerima response dan merender ulang product cards sesuai urutan baru
9. Dropdown menampilkan opsi yang aktif
10. Statistik waktu sorting ditampilkan (opsional)
```

## 5.3 Melihat Detail Produk

```
1. User berada di halaman Katalog Produk (/products)
2. User mengklik salah satu product card
3. Sistem navigasi ke halaman Detail Produk (/products/[id])
4. Frontend mengirim request: GET /api/products/[id]
5. Server mengambil data produk dari database berdasarkan ID
6. Frontend merender halaman detail dengan:
   - Gambar produk
   - Nama, brand, kategori
   - Harga
   - Rating dan popularitas
   - Stok
   - Deskripsi lengkap
7. User dapat kembali ke katalog via breadcrumb atau tombol "Kembali"
```

## 5.4 Admin Menambah Produk

```
1. Admin membuka halaman Login (/admin/login)
2. Admin memasukkan username dan password
3. Sistem memvalidasi kredensial
   3a. Jika valid → redirect ke Dashboard (/admin)
   3b. Jika invalid → tampilkan error "Kredensial salah"
4. Admin mengklik tombol "Tambah Produk" atau navigasi ke /admin/products/add
5. Sistem menampilkan form tambah produk
6. Admin mengisi semua field yang diperlukan:
   - Nama produk, Kategori, Brand, Harga, Rating, Popularitas, Stok, Deskripsi, URL Gambar
7. Admin mengklik tombol "Simpan"
8. Frontend mengirim request: POST /api/products dengan body data produk
9. Server memvalidasi data
   9a. Jika valid → simpan ke database via Prisma → insert ke BST Nama dan BST Kategori → return success
   9b. Jika invalid → return error dengan detail validasi
10. Frontend menampilkan notifikasi sukses/error
11. Admin redirect ke halaman tabel produk (/admin/products)
```

## 5.5 Admin Mengedit Produk

```
1. Admin berada di halaman Tabel Produk (/admin/products)
2. Admin mengklik tombol "Edit" pada baris produk tertentu
3. Sistem navigasi ke halaman Edit Produk (/admin/products/edit/[id])
4. Frontend mengirim request: GET /api/products/[id]
5. Sistem menampilkan form yang sudah terisi data produk saat ini
6. Admin mengubah field yang diinginkan
7. Admin mengklik tombol "Update"
8. Frontend mengirim request: PUT /api/products/[id] dengan body data baru
9. Server memvalidasi data
   9a. Jika valid → update di database via Prisma
   9b. Jika nama atau kategori berubah → rebuild BST yang terkait
   9c. Jika invalid → return error
10. Frontend menampilkan notifikasi sukses/error
11. Admin redirect ke halaman tabel produk
```

## 5.6 Admin Menghapus Produk

```
1. Admin berada di halaman Tabel Produk (/admin/products)
2. Admin mengklik tombol "Hapus" pada baris produk tertentu
3. Sistem menampilkan Confirmation Modal:
   "Apakah Anda yakin ingin menghapus produk [Nama Produk]?"
4. Admin mengklik "Ya, Hapus"
5. Frontend mengirim request: DELETE /api/products/[id]
6. Server menghapus data dari database via Prisma
7. Server menghapus node terkait dari BST Nama dan BST Kategori
8. Server mengembalikan response success
9. Frontend menghapus baris dari tabel dan menampilkan notifikasi sukses
10. Jika admin mengklik "Batal" pada modal → modal ditutup, tidak ada aksi
```

---

# 6. Struktur Data

## 6.1 Struktur Data Product

| Atribut | Tipe Data | Contoh Nilai | Fungsi |
|---------|-----------|-------------|--------|
| `id` | `string` (UUID/CUID) | `"clx1a2b3c..."` | Primary key unik untuk identifikasi produk di database |
| `name` | `string` | `"ASUS ROG Strix G16"` | Nama produk, digunakan sebagai **key BST Nama** |
| `category` | `string` | `"Laptop"` | Kategori produk, digunakan sebagai **key BST Kategori** |
| `brand` | `string` | `"ASUS"` | Merek/pabrikan produk untuk filtering tambahan |
| `price` | `number` (float) | `18999000` | Harga produk dalam Rupiah, digunakan sebagai **field Quick Sort** |
| `rating` | `number` (float) | `4.7` | Nilai rating 0.0–5.0, digunakan sebagai **field Quick Sort** |
| `popularity` | `number` (integer) | `1250` | Jumlah views/terjual sebagai indikator popularitas, digunakan sebagai **field Quick Sort** |
| `stock` | `number` (integer) | `15` | Jumlah stok yang tersedia |
| `description` | `string` (text) | `"Laptop gaming dengan..."` | Deskripsi lengkap produk |
| `image` | `string` (URL) | `"/images/rog-strix.jpg"` | URL gambar produk |
| `specifications` | `JSON` (object) | `{ "RAM": "16GB", ... }` | Spesifikasi teknis produk dalam format key-value |
| `createdAt` | `DateTime` | `2026-06-16T07:00:00Z` | Timestamp pembuatan record |
| `updatedAt` | `DateTime` | `2026-06-16T08:30:00Z` | Timestamp terakhir record diubah |

## 6.2 TypeScript Interface

```
Product {
  id: string
  name: string
  category: string
  brand: string
  price: number
  rating: number
  popularity: number
  stock: number
  description: string
  image: string
  specifications: Record<string, string>
  createdAt: Date
  updatedAt: Date
}
```

## 6.3 Enum Kategori yang Didukung

| Kategori | Deskripsi |
|----------|-----------|
| `Laptop` | Laptop untuk gaming, kerja, belajar |
| `Smartphone` | Handphone Android dan iOS |
| `Monitor` | Monitor untuk gaming dan produktivitas |
| `Keyboard` | Keyboard mechanical dan membrane |
| `Mouse` | Mouse gaming dan office |
| `Headset` | Headset dan earphone |
| `Component` | RAM, SSD, GPU, Motherboard, PSU, Casing, dll. |
| `Accessory` | Aksesoris lainnya (webcam, USB hub, stand, dll.) |

---

# 7. Desain Binary Search Tree

## 7.1 Rekomendasi Arsitektur: 2 BST Terpisah ✅

> [!IMPORTANT]
> **Rekomendasi: Gunakan 2 BST terpisah** — satu untuk pencarian berdasarkan **nama produk** dan satu untuk pencarian berdasarkan **kategori**.

### Mengapa 2 BST Terpisah?

BST secara fundamental hanya mendukung **satu key per tree** untuk menjaga properti ordering ($\text{left} < \text{root} < \text{right}$). Karena kita butuh pencarian berdasarkan dua kriteria berbeda (nama dan kategori), pendekatan terbaik adalah memiliki dua tree terpisah.

### Perbandingan Pendekatan

| Aspek | 2 BST Terpisah (✅ Rekomendasi) | 1 BST + Linear Filter | Composite Key BST |
|-------|------|------|------|
| **Kompleksitas pencarian** | $O(\log n)$ untuk kedua field | $O(\log n)$ untuk satu, $O(n)$ untuk lainnya | $O(\log n)$ tapi hanya efektif jika query kedua key |
| **Konsistensi performa** | Konsisten cepat | Tidak konsisten | Terbatas |
| **Kejelasan konsep SDA** | Sangat jelas, mudah dijelaskan | Kurang menunjukkan SDA | Terlalu kompleks |
| **Memory overhead** | 2× node pointer | 1× node pointer | 1× node pointer |
| **Kompleksitas implementasi** | Sedang | Rendah | Tinggi |
| **Sinkronisasi saat CRUD** | Perlu update 2 tree | Perlu update 1 tree | Perlu update 1 tree |
| **Cocok untuk tugas SDA** | ⭐ Sangat cocok | Kurang | Terlalu advanced |

> [!TIP]
> Memory overhead 2× untuk node pointer bukan masalah signifikan pada skala kecil–menengah (ribuan produk). Keuntungan performa pencarian $O(\log n)$ pada dua dimensi jauh lebih bernilai untuk demonstrasi mata kuliah.

## 7.2 Struktur Node BST

### BST Nama (BSTByName)

```
BSTNode<T> {
  key: string         // nama produk (lowercase, untuk perbandingan)
  data: Product       // referensi ke objek produk lengkap
  left: BSTNode<T>    // child kiri (nama < key)
  right: BSTNode<T>   // child kanan (nama > key)
}
```

**Key:** `product.name.toLowerCase()`  
**Ordering:** Alfabet (string comparison)  
**Kegunaan:** Mencari produk berdasarkan nama exact atau prefix match.

### BST Kategori (BSTByCategory)

```
CategoryBSTNode {
  key: string                  // nama kategori (lowercase)
  products: Product[]          // array produk dalam kategori ini
  left: CategoryBSTNode       // child kiri (kategori < key)
  right: CategoryBSTNode      // child kanan (kategori > key)
}
```

**Key:** `product.category.toLowerCase()`  
**Ordering:** Alfabet (string comparison)  
**Kegunaan:** Mengambil semua produk dalam satu kategori secara cepat.

> [!NOTE]
> BST Kategori menyimpan **array produk** di setiap node karena satu kategori berisi banyak produk. Ini berbeda dari BST Nama di mana setiap nama idealnya unik.

## 7.3 Operasi BST dan Kompleksitas

| Operasi | Deskripsi | Average Case | Worst Case | Keterangan |
|---------|-----------|:------------:|:----------:|------------|
| **Insert** | Menyisipkan node baru ke posisi yang tepat | $O(\log n)$ | $O(n)$ | Worst case jika tree menjadi skewed |
| **Search** | Mencari node berdasarkan key | $O(\log n)$ | $O(n)$ | Pencarian binary, belah kiri/kanan |
| **Delete** | Menghapus node (3 kasus: leaf, 1 child, 2 children) | $O(\log n)$ | $O(n)$ | Kasus 2 children: cari inorder successor |
| **Inorder Traversal** | Mengunjungi semua node secara terurut (ascending) | $O(n)$ | $O(n)$ | Left → Root → Right, menghasilkan data terurut |
| **Prefix Search** | Mencari semua nama yang dimulai dengan prefix tertentu | $O(\log n + k)$ | $O(n)$ | $k$ = jumlah hasil yang cocok |
| **Build Tree** | Membangun BST dari array data | $O(n \log n)$ | $O(n^2)$ | Insert satu-per-satu dari array |

**Kompleksitas Ruang:** $O(n)$ — setiap produk disimpan sebagai satu node (atau referensi ke satu node).

## 7.4 Sinkronisasi BST dengan Database

```mermaid
sequenceDiagram
    participant Client
    participant API as API Route
    participant BST as BST (Memory)
    participant DB as Neon PostgreSQL

    Note over BST: BST dibangun saat server start

    Client->>API: GET /api/products/search?name=X
    API->>BST: bstByName.search("x")
    BST-->>API: Product[] atau null
    API-->>Client: JSON response

    Client->>API: POST /api/products (tambah)
    API->>DB: prisma.product.create(data)
    DB-->>API: Product baru
    API->>BST: bstByName.insert(product)
    API->>BST: bstByCategory.insert(product)
    API-->>Client: success

    Client->>API: DELETE /api/products/:id
    API->>DB: prisma.product.delete(id)
    DB-->>API: success
    API->>BST: bstByName.delete(productName)
    API->>BST: bstByCategory.delete(productCategory, productId)
    API-->>Client: success
```

### Kapan BST Dibangun Ulang?

| Kejadian | Aksi BST |
|----------|----------|
| Server pertama kali start | **Full rebuild** — ambil semua produk dari DB, insert satu-per-satu ke BST |
| Produk baru ditambah | **Incremental insert** — insert node baru ke kedua BST |
| Produk dihapus | **Incremental delete** — hapus node dari kedua BST |
| Produk diedit (nama/kategori berubah) | **Delete lama + insert baru** di BST yang key-nya berubah |
| Produk diedit (field lain berubah) | **Update data** di node BST yang sudah ada (tanpa restruktur tree) |
| Diduga tree sangat tidak seimbang | **Full rebuild** (manual trigger atau periodik) |

## 7.5 Trade-off dan Pertimbangan

| Trade-off | Detail |
|-----------|--------|
| **Memory vs Speed** | BST di memory = cepat ($O(\log n)$), tapi menggunakan RAM. Untuk ~5000 produk, ini masih sangat kecil (~beberapa MB). |
| **Konsistensi** | Ada risiko BST dan DB out-of-sync jika server crash saat operasi. Mitigasi: rebuild BST saat server restart. |
| **Unbalanced tree** | Jika data diinsert secara terurut, BST bisa menjadi linked list ($O(n)$). Mitigasi: shuffle data saat build, atau rebuild periodik. |
| **Serverless challenge** | Vercel menggunakan serverless functions yang bisa cold start. BST di memory akan hilang saat function di-recycle. Mitigasi: rebuild BST setiap kali function cold start, atau gunakan singleton pattern dengan caching. |

> [!WARNING]
> **Serverless & BST:** Karena Vercel menggunakan serverless architecture, BST di memory **tidak persistent** antar request (kecuali function masih "warm"). Solusi yang direkomendasikan:
> 1. Gunakan **module-level variable** (singleton) yang bertahan selama function instance hidup.
> 2. BST di-rebuild otomatis saat cold start (lazy initialization).
> 3. Untuk demonstrasi tugas SDA, ini masih valid dan dapat dijelaskan sebagai bagian dari trade-off.

---

# 8. Desain Quick Sort

## 8.1 Mengapa Quick Sort?

| Aspek | Quick Sort | Bubble Sort | Selection Sort |
|-------|:----------:|:-----------:|:--------------:|
| **Average Case** | $O(n \log n)$ | $O(n^2)$ | $O(n^2)$ |
| **Best Case** | $O(n \log n)$ | $O(n)$ (sudah terurut) | $O(n^2)$ |
| **Worst Case** | $O(n^2)$ | $O(n^2)$ | $O(n^2)$ |
| **Space** | $O(\log n)$ (in-place) | $O(1)$ | $O(1)$ |
| **Praktis?** | ⭐ Sangat cepat | Sangat lambat | Lambat |
| **In-place?** | ✅ Ya | ✅ Ya | ✅ Ya |
| **Stable?** | ❌ Tidak | ✅ Ya | ❌ Tidak |

**Alasan utama memilih Quick Sort:**
1. **Performa rata-rata terbaik** di antara algoritma comparison-based sort yang sederhana.
2. **In-place sorting** — tidak membutuhkan array tambahan signifikan.
3. **Cache-friendly** — akses memori lebih sekuensial dibanding Merge Sort.
4. **Mudah diimplementasikan** secara rekursif untuk demonstrasi mata kuliah.
5. **Perbedaan performa dengan Bubble Sort sangat terlihat** pada dataset besar, cocok untuk perbandingan.

## 8.2 Strategi Pivot

> [!IMPORTANT]
> **Rekomendasi: Median-of-Three Pivot**

Strategi pemilihan pivot sangat mempengaruhi performa Quick Sort:

| Strategi | Deskripsi | Best for | Worst case trigger |
|----------|-----------|----------|-------------------|
| First element | Ambil elemen pertama sebagai pivot | Data random | Data terurut → $O(n^2)$ |
| Last element | Ambil elemen terakhir | Data random | Data terurut → $O(n^2)$ |
| **Median-of-Three** ✅ | Ambil median dari first, middle, last | **Hampir semua kasus** | Sangat jarang |
| Random | Ambil elemen random | Data adversarial | Probabilistik |

**Median-of-Three dipilih karena:**
- Menghindari worst case pada data yang sudah terurut (sangat umum setelah sorting sebelumnya).
- Deterministik (reproducible untuk testing).
- Overhead pemilihan pivot minimal (hanya 3 perbandingan).

## 8.3 Alur Quick Sort (Pseudocode)

```
function quickSort(arr, low, high, field, order):
    if low < high:
        pivotIndex = partition(arr, low, high, field, order)
        quickSort(arr, low, pivotIndex - 1, field, order)
        quickSort(arr, pivotIndex + 1, high, field, order)

function partition(arr, low, high, field, order):
    pivot = medianOfThree(arr, low, high, field)
    i = low - 1
    
    for j = low to high - 1:
        if shouldSwap(arr[j][field], pivot[field], order):
            i = i + 1
            swap(arr[i], arr[j])
    
    swap(arr[i + 1], arr[high])
    return i + 1

function medianOfThree(arr, low, high, field):
    mid = (low + high) / 2
    // Sort arr[low], arr[mid], arr[high] and use middle as pivot
    // Place pivot at arr[high] position
    return pivot

function shouldSwap(a, b, order):
    if order == "asc": return a < b
    if order == "desc": return a > b
```

## 8.4 Penggunaan pada Berbagai Field

| Sort Option | Field | Order | Contoh |
|-------------|-------|-------|--------|
| Harga: Termurah → Termahal | `price` | `asc` | Rp500.000 → Rp50.000.000 |
| Harga: Termahal → Termurah | `price` | `desc` | Rp50.000.000 → Rp500.000 |
| Rating Tertinggi | `rating` | `desc` | 5.0 → 1.0 |
| Rating Terendah | `rating` | `asc` | 1.0 → 5.0 |
| Popularitas Tertinggi | `popularity` | `desc` | 10.000 → 1 |
| Popularitas Terendah | `popularity` | `asc` | 1 → 10.000 |

Quick Sort menerima parameter `field` dan `order` untuk menentukan kriteria perbandingan secara dinamis.

## 8.5 Kompleksitas

| Kasus | Waktu | Ruang | Kondisi |
|-------|:-----:|:-----:|---------|
| **Best Case** | $O(n \log n)$ | $O(\log n)$ | Pivot selalu membagi array menjadi 2 bagian seimbang |
| **Average Case** | $O(n \log n)$ | $O(\log n)$ | Pivot membagi array secara cukup seimbang (probabilistik) |
| **Worst Case** | $O(n^2)$ | $O(n)$ | Pivot selalu elemen terkecil/terbesar (data terurut + pivot first/last) |

> [!TIP]
> Dengan strategi **Median-of-Three**, worst case sangat jarang terjadi. Untuk dataset BinaryMart (~ratusan hingga ribuan produk), Quick Sort akan berjalan sangat cepat (<10ms).

## 8.6 Integrasi Quick Sort dalam Sistem

```mermaid
flowchart LR
    A["Client Request<br/>sortBy=price&order=asc"] --> B["API Route<br/>/api/products"]
    B --> C["Ambil data<br/>dari Database"]
    C --> D["Quick Sort<br/>berdasarkan field & order"]
    D --> E["Return array<br/>terurut ke Client"]

    style D fill:#fbbf24,stroke:#d97706,color:#000
```

Quick Sort dijalankan di **server-side** setelah data diambil dari database. Ini memastikan:
1. Beban sorting ada di server, bukan browser client.
2. Konsisten hasilnya terlepas dari browser/device.
3. Implementasi algoritma terpusat dan mudah diuji.

---

# 9. Database Design

## 9.1 Tabel `Product`

| Kolom | Tipe | Constraint | Keterangan |
|-------|------|------------|------------|
| `id` | `String` (CUID) | `@id @default(cuid())` | Primary key, generated otomatis |
| `name` | `String` | `@unique` | Nama produk, unik, index untuk pencarian |
| `category` | `String` | — | Kategori produk (Laptop, Smartphone, dll.) |
| `brand` | `String` | — | Merek produk |
| `price` | `Float` | — | Harga dalam Rupiah |
| `rating` | `Float` | `@default(0)` | Rating 0.0–5.0 |
| `popularity` | `Int` | `@default(0)` | Skor popularitas |
| `stock` | `Int` | `@default(0)` | Jumlah stok |
| `description` | `String` | `@db.Text` | Deskripsi lengkap |
| `image` | `String` | — | URL gambar produk |
| `specifications` | `Json` | `@default("{}")` | Spesifikasi teknis (key-value) |
| `createdAt` | `DateTime` | `@default(now())` | Timestamp pembuatan |
| `updatedAt` | `DateTime` | `@updatedAt` | Timestamp update terakhir |

**Index yang direkomendasikan:**
- `@@index([category])` — mempercepat query filter by kategori di level DB
- `@@index([price])` — opsional, untuk query range harga
- `name` sudah `@unique` sehingga otomatis ter-index

## 9.2 Tabel `Admin`

| Kolom | Tipe | Constraint | Keterangan |
|-------|------|------------|------------|
| `id` | `String` (CUID) | `@id @default(cuid())` | Primary key |
| `username` | `String` | `@unique` | Username admin, unik |
| `password` | `String` | — | Password yang di-hash (bcrypt) |
| `name` | `String` | — | Nama lengkap admin |
| `email` | `String` | `@unique` | Email admin |
| `createdAt` | `DateTime` | `@default(now())` | Timestamp pembuatan akun |
| `updatedAt` | `DateTime` | `@updatedAt` | Timestamp update terakhir |

## 9.3 Prisma Schema Preview

```
model Product {
  id             String   @id @default(cuid())
  name           String   @unique
  category       String
  brand          String
  price          Float
  rating         Float    @default(0)
  popularity     Int      @default(0)
  stock          Int      @default(0)
  description    String   @db.Text
  image          String
  specifications Json     @default("{}")
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  @@index([category])
  @@index([price])
}

model Admin {
  id        String   @id @default(cuid())
  username  String   @unique
  password  String
  name      String
  email     String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 9.4 Entity Relationship Diagram

```mermaid
erDiagram
    PRODUCT {
        string id PK
        string name UK
        string category
        string brand
        float price
        float rating
        int popularity
        int stock
        string description
        string image
        json specifications
        datetime createdAt
        datetime updatedAt
    }

    ADMIN {
        string id PK
        string username UK
        string password
        string name
        string email UK
        datetime createdAt
        datetime updatedAt
    }
```

> [!NOTE]
> Tidak ada relasi langsung antara Product dan Admin karena tidak diperlukan tracking "siapa yang menambah produk". Jika diperlukan audit trail, bisa ditambahkan field `createdBy` di Product yang mereferensikan Admin.id.

---

# 10. Arsitektur Sistem

## 10.1 Arsitektur Overview

```mermaid
graph TD
    subgraph "Client (Browser)"
        U["👤 User / Admin"]
        FE["Next.js Frontend<br/>(React + TypeScript)"]
    end

    subgraph "Server (Vercel Serverless)"
        API["Next.js API Routes<br/>(Route Handlers)"]
        BST["BST Engine<br/>(In-Memory)"]
        QS["Quick Sort Engine"]
        AUTH["Auth Middleware<br/>(JWT/Session)"]
    end

    subgraph "Database"
        DB["Neon PostgreSQL"]
    end

    subgraph "ORM"
        PR["Prisma Client"]
    end

    U -->|"HTTP Request"| FE
    FE -->|"fetch/axios"| API
    API -->|"Search query"| BST
    API -->|"Sort request"| QS
    API -->|"Auth check"| AUTH
    API -->|"CRUD"| PR
    PR -->|"SQL"| DB

    style BST fill:#10b981,stroke:#059669,color:#fff
    style QS fill:#f59e0b,stroke:#d97706,color:#000
    style AUTH fill:#6366f1,stroke:#4f46e5,color:#fff
```

## 10.2 Posisi BST dalam Arsitektur

BST berada di **layer server (API Routes)** sebagai **in-memory data structure**:

```
Request masuk → API Route → Cek apakah BST sudah dibangun?
                               ├── Belum → Ambil semua data dari DB → Build BST → Proses query
                               └── Sudah → Langsung proses query via BST
```

- BST **bukan pengganti database**, melainkan **layer caching/indexing** untuk pencarian cepat.
- Database tetap menjadi **source of truth**.
- BST di-rebuild saat cold start atau setelah operasi CRUD yang mengubah key.

## 10.3 Posisi Quick Sort dalam Arsitektur

Quick Sort berada di **layer server (API Routes)** sebagai **utility function**:

```
Request sorting masuk → API Route → Ambil data dari DB (atau dari BST inorder)
                                   → Jalankan Quick Sort berdasarkan field & order
                                   → Return array terurut
```

- Quick Sort dijalankan pada **array hasil query**, bukan pada database langsung.
- Implementasi Quick Sort adalah **manual** (bukan `Array.sort()`), sesuai requirement.

---

# 11. Struktur Folder Project

```
BinaryMart/
├── app/                          # Next.js App Router (pages & layouts)
│   ├── layout.tsx                # Root layout (HTML, body, font, global providers)
│   ├── page.tsx                  # Home page (landing page)
│   ├── products/
│   │   ├── page.tsx              # Product catalog page
│   │   └── [id]/
│   │       └── page.tsx          # Product detail page
│   ├── admin/
│   │   ├── layout.tsx            # Admin layout (sidebar, auth guard)
│   │   ├── page.tsx              # Admin dashboard
│   │   ├── login/
│   │   │   └── page.tsx          # Admin login page
│   │   └── products/
│   │       ├── page.tsx          # Admin product table
│   │       ├── add/
│   │       │   └── page.tsx      # Add product form
│   │       └── edit/
│   │           └── [id]/
│   │               └── page.tsx  # Edit product form
│   ├── api/                      # API Routes (Route Handlers)
│   │   ├── products/
│   │   │   ├── route.ts          # GET all, POST new
│   │   │   ├── [id]/
│   │   │   │   └── route.ts      # GET by id, PUT, DELETE
│   │   │   └── search/
│   │   │       └── route.ts      # GET search (BST)
│   │   ├── categories/
│   │   │   └── route.ts          # GET all categories
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── route.ts      # POST login
│   │   │   └── logout/
│   │   │       └── route.ts      # POST logout
│   │   └── stats/
│   │       └── route.ts          # GET algorithm statistics
│   └── not-found.tsx             # Custom 404 page
│
├── components/                   # Reusable UI components
│   ├── ui/                       # Generic UI primitives
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── Dropdown.tsx
│   │   ├── Pagination.tsx
│   │   └── Loading.tsx
│   ├── layout/                   # Layout components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   └── Container.tsx
│   ├── product/                  # Product-specific components
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductTable.tsx
│   │   ├── ProductForm.tsx
│   │   ├── ProductDetail.tsx
│   │   └── ProductFilter.tsx
│   ├── search/                   # Search-related components
│   │   ├── SearchBar.tsx
│   │   ├── SearchResults.tsx
│   │   └── CategoryFilter.tsx
│   ├── sort/                     # Sort-related components
│   │   └── SortDropdown.tsx
│   └── stats/                    # Algorithm stats components
│       ├── AlgorithmStats.tsx
│       └── BSTVisualizer.tsx
│
├── lib/                          # Core libraries & algorithms
│   ├── algorithms/               # ⭐ Implementasi SDA
│   │   ├── bst.ts                # Binary Search Tree class
│   │   ├── bst-name.ts           # BST khusus pencarian nama
│   │   ├── bst-category.ts       # BST khusus pencarian kategori
│   │   ├── quicksort.ts          # Quick Sort implementation
│   │   └── benchmark.ts          # Utility untuk benchmark performa
│   ├── db.ts                     # Prisma client singleton
│   ├── auth.ts                   # Authentication utilities
│   └── bst-manager.ts            # BST lifecycle manager (build, rebuild, sync)
│
├── prisma/                       # Prisma schema & migrations
│   ├── schema.prisma             # Database schema
│   ├── seed.ts                   # Seed data script
│   └── migrations/               # Auto-generated migrations
│
├── types/                        # TypeScript type definitions
│   ├── product.ts                # Product types & interfaces
│   ├── api.ts                    # API request/response types
│   └── auth.ts                   # Auth types
│
├── hooks/                        # Custom React hooks
│   ├── useProducts.ts            # Hook untuk fetch/manage products
│   ├── useSearch.ts              # Hook untuk pencarian
│   ├── useSort.ts                # Hook untuk sorting
│   └── useAuth.ts                # Hook untuk authentication state
│
├── services/                     # API service layer (client-side)
│   ├── productService.ts         # Product API calls
│   ├── authService.ts            # Auth API calls
│   └── statsService.ts           # Stats API calls
│
├── utils/                        # Utility/helper functions
│   ├── formatters.ts             # Format harga, tanggal, dll.
│   ├── validators.ts             # Validasi input
│   └── constants.ts              # Konstanta aplikasi
│
├── public/                       # Static files
│   ├── images/                   # Product images
│   └── icons/                    # App icons
│
├── .env                          # Environment variables (local)
├── .env.example                  # Template environment variables
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

### Penjelasan Fungsi Folder

| Folder | Fungsi |
|--------|--------|
| `app/` | Next.js App Router — berisi semua halaman, layout, dan API routes |
| `components/` | Komponen React yang reusable, diorganisir per domain |
| `lib/` | **⭐ Inti proyek SDA** — berisi implementasi BST dan Quick Sort |
| `lib/algorithms/` | Implementasi murni algoritma tanpa dependency framework |
| `prisma/` | Schema database, migrations, dan seed data |
| `types/` | TypeScript interfaces dan types untuk type safety |
| `hooks/` | Custom React hooks untuk state management dan data fetching |
| `services/` | Layer abstraksi untuk API calls dari client |
| `utils/` | Helper functions umum (format, validasi, konstanta) |
| `public/` | File statis yang bisa diakses langsung via URL |

---

# 12. Daftar Halaman (Pages)

| No | Halaman | Route | Akses | Deskripsi |
|----|---------|-------|-------|-----------|
| 1 | **Home** | `/` | Public | Landing page dengan hero section, produk featured, dan ringkasan fitur. Tujuan: menarik minat pengunjung. |
| 2 | **Product Catalog** | `/products` | Public | Daftar seluruh produk dengan fitur search (BST), filter kategori (BST), sort (Quick Sort), dan paginasi. **Halaman utama untuk demonstrasi SDA.** |
| 3 | **Product Detail** | `/products/[id]` | Public | Informasi lengkap satu produk: gambar, spesifikasi, harga, rating, stok, deskripsi. |
| 4 | **Admin Login** | `/admin/login` | Public | Form login admin (username + password). Redirect ke dashboard jika sudah login. |
| 5 | **Admin Dashboard** | `/admin` | Admin | Ringkasan statistik: total produk, total kategori, rata-rata rating, produk terbaru. |
| 6 | **Admin Product Table** | `/admin/products` | Admin | Tabel produk dengan aksi Edit/Delete, search, dan sort. |
| 7 | **Add Product** | `/admin/products/add` | Admin | Form untuk menambah produk baru. |
| 8 | **Edit Product** | `/admin/products/edit/[id]` | Admin | Form untuk mengedit produk yang sudah ada (pre-filled). |
| 9 | **Not Found (404)** | `/not-found` | Public | Halaman error 404 dengan navigasi kembali. |

---

# 13. Komponen UI

| No | Komponen | File | Fungsi |
|----|----------|------|--------|
| 1 | **Navbar** | `Navbar.tsx` | Navigasi utama: logo, link ke Home, Catalog, dan Admin. Responsive (hamburger menu di mobile). |
| 2 | **Footer** | `Footer.tsx` | Footer dengan informasi copyright, link sosial, dan credit mata kuliah. |
| 3 | **Sidebar** | `Sidebar.tsx` | Sidebar navigasi admin: Dashboard, Products, Add Product, Logout. |
| 4 | **Container** | `Container.tsx` | Wrapper untuk konten halaman dengan max-width dan padding yang konsisten. |
| 5 | **Product Card** | `ProductCard.tsx` | Kartu produk untuk tampilan grid: gambar, nama, harga, rating, badge kategori. Hover effect. |
| 6 | **Product Grid** | `ProductGrid.tsx` | Grid layout responsive untuk menampilkan kumpulan ProductCard. |
| 7 | **Product Table** | `ProductTable.tsx` | Tabel data produk untuk admin view, dengan kolom name, category, price, stock, actions (edit/delete). |
| 8 | **Product Form** | `ProductForm.tsx` | Form reusable untuk tambah/edit produk. Validasi client-side. Digunakan di halaman Add dan Edit. |
| 9 | **Product Detail** | `ProductDetail.tsx` | Layout detail produk: gambar besar, info lengkap, spesifikasi dalam tabel. |
| 10 | **Search Bar** | `SearchBar.tsx` | Input field dengan icon search, debounce, dan trigger pencarian ke BST. |
| 11 | **Sort Dropdown** | `SortDropdown.tsx` | Dropdown untuk memilih kriteria sorting: harga (asc/desc), rating (asc/desc), popularitas (asc/desc). |
| 12 | **Category Filter** | `CategoryFilter.tsx` | List/chips kategori yang bisa diklik untuk filter produk. Active state pada kategori terpilih. |
| 13 | **Product Filter** | `ProductFilter.tsx` | Wrapper yang menggabungkan SearchBar + CategoryFilter + SortDropdown. |
| 14 | **Pagination** | `Pagination.tsx` | Komponen paginasi: prev, next, halaman aktif. |
| 15 | **Modal** | `Modal.tsx` | Confirmation modal generik. Digunakan untuk konfirmasi delete produk. |
| 16 | **Button** | `Button.tsx` | Button reusable dengan variant (primary, secondary, danger, ghost). |
| 17 | **Input** | `Input.tsx` | Input field reusable dengan label, error message, dan styling konsisten. |
| 18 | **Badge** | `Badge.tsx` | Badge untuk menampilkan kategori produk dengan warna berbeda per kategori. |
| 19 | **Card** | `Card.tsx` | Card generik sebagai container dengan shadow dan rounded corners. |
| 20 | **Loading** | `Loading.tsx` | Loading spinner/skeleton untuk state loading. |
| 21 | **Algorithm Stats** | `AlgorithmStats.tsx` | Panel yang menampilkan statistik eksekusi algoritma: waktu BST search, waktu Quick Sort, perbandingan. |
| 22 | **BST Visualizer** | `BSTVisualizer.tsx` | (Opsional) Visualisasi pohon BST menggunakan SVG/Canvas. Untuk presentasi. |

---

# 14. API Planning

## 14.1 Endpoint Produk

| Method | Endpoint | Deskripsi | Auth | Request Body | Response |
|--------|----------|-----------|:----:|-------------|----------|
| `GET` | `/api/products` | Ambil semua produk, dengan optional query: `sortBy`, `order`, `category`, `page`, `limit` | ❌ | — | `{ products: Product[], total: number, page: number, stats: { sortTime: number } }` |
| `GET` | `/api/products/[id]` | Ambil detail satu produk berdasarkan ID | ❌ | — | `{ product: Product }` |
| `POST` | `/api/products` | Tambah produk baru | ✅ Admin | `{ name, category, brand, price, rating, popularity, stock, description, image, specifications }` | `{ product: Product }` |
| `PUT` | `/api/products/[id]` | Update produk berdasarkan ID | ✅ Admin | `{ name?, category?, brand?, price?, ...partial fields }` | `{ product: Product }` |
| `DELETE` | `/api/products/[id]` | Hapus produk berdasarkan ID | ✅ Admin | — | `{ message: "Deleted" }` |

## 14.2 Endpoint Pencarian (BST)

| Method | Endpoint | Deskripsi | Auth | Query Params | Response |
|--------|----------|-----------|:----:|-------------|----------|
| `GET` | `/api/products/search` | Cari produk menggunakan BST | ❌ | `name` (string), `category` (string) | `{ products: Product[], stats: { searchTime: number, method: "BST" } }` |

## 14.3 Endpoint Kategori

| Method | Endpoint | Deskripsi | Auth | Response |
|--------|----------|-----------|:----:|----------|
| `GET` | `/api/categories` | Ambil daftar semua kategori yang tersedia (dari BST Kategori inorder traversal) | ❌ | `{ categories: string[] }` |

## 14.4 Endpoint Auth

| Method | Endpoint | Deskripsi | Auth | Request Body | Response |
|--------|----------|-----------|:----:|-------------|----------|
| `POST` | `/api/auth/login` | Login admin | ❌ | `{ username, password }` | `{ token: string, admin: { id, name, username } }` |
| `POST` | `/api/auth/logout` | Logout admin | ✅ | — | `{ message: "Logged out" }` |

## 14.5 Endpoint Statistik

| Method | Endpoint | Deskripsi | Auth | Response |
|--------|----------|-----------|:----:|----------|
| `GET` | `/api/stats` | Statistik dashboard admin: total produk, total kategori, rata-rata rating, dll. | ✅ Admin | `{ totalProducts, totalCategories, avgRating, avgPrice, recentProducts }` |

## 14.6 Format Response Standar

**Sukses:**
```json
{
  "success": true,
  "data": { ... },
  "stats": {
    "executionTime": 2.5,
    "algorithm": "BST Search"
  }
}
```

**Error:**
```json
{
  "success": false,
  "error": {
    "code": "PRODUCT_NOT_FOUND",
    "message": "Produk dengan ID tersebut tidak ditemukan"
  }
}
```

---

# 15. Deployment Planning

## 15.1 Arsitektur Deployment

```mermaid
graph LR
    subgraph "Development"
        DEV["Local Dev<br/>(npm run dev)"]
        GIT["GitHub Repository"]
    end

    subgraph "CI/CD"
        VC["Vercel<br/>(Auto Deploy)"]
    end

    subgraph "Database"
        NEON["Neon PostgreSQL<br/>(Cloud)"]
    end

    DEV -->|"git push"| GIT
    GIT -->|"webhook"| VC
    VC -->|"Prisma Client"| NEON
```

## 15.2 Langkah Deployment

### Step 1: Persiapan Repository GitHub
1. Buat repository `BinaryMart` di GitHub.
2. Hubungkan repository lokal ke remote.
3. Pastikan `.gitignore` sudah mencakup `node_modules/`, `.env`, `.next/`.
4. Push kode ke branch `main`.

### Step 2: Setup Neon PostgreSQL
1. Daftar akun di [neon.tech](https://neon.tech).
2. Buat project baru bernama `binarymart`.
3. Salin connection string (format: `postgresql://user:pass@host/dbname?sslmode=require`).
4. Jalankan `npx prisma migrate deploy` untuk membuat tabel di Neon.
5. Jalankan `npx prisma db seed` untuk mengisi data awal (opsional).

### Step 3: Setup Vercel
1. Daftar/login ke [vercel.com](https://vercel.com).
2. Klik "New Project" → Import dari GitHub → pilih repository `BinaryMart`.
3. Framework Preset: **Next.js** (auto-detect).
4. Tambahkan Environment Variables (lihat 15.3).
5. Klik "Deploy".

### Step 4: Verifikasi
1. Buka URL deployment yang diberikan Vercel.
2. Cek apakah halaman publik berfungsi.
3. Cek apakah API endpoint merespons.
4. Cek apakah koneksi database berhasil.
5. Test login admin.

## 15.3 Environment Variables

| Variable | Deskripsi | Contoh | Tempat |
|----------|-----------|--------|--------|
| `DATABASE_URL` | Connection string Neon PostgreSQL | `postgresql://user:pass@ep-xxx.region.aws.neon.tech/binarymart?sslmode=require` | Vercel + `.env` lokal |
| `DIRECT_URL` | Direct connection URL (untuk Prisma migrate) | `postgresql://user:pass@ep-xxx.region.aws.neon.tech/binarymart?sslmode=require` | Vercel + `.env` lokal |
| `JWT_SECRET` | Secret key untuk JWT token | `supersecretkey123456` | Vercel + `.env` lokal |
| `ADMIN_DEFAULT_USERNAME` | Username admin default (untuk seed) | `admin` | `.env` lokal saja |
| `ADMIN_DEFAULT_PASSWORD` | Password admin default (untuk seed) | `admin123` | `.env` lokal saja |
| `NEXT_PUBLIC_APP_URL` | URL publik aplikasi | `https://binarymart.vercel.app` | Vercel |

> [!CAUTION]
> Jangan commit file `.env` ke repository. Gunakan `.env.example` sebagai template tanpa nilai sensitif.

---

# 16. Testing Planning

## 16.1 Functional Testing

| No | Skenario | Steps | Expected Result |
|----|----------|-------|-----------------|
| FT-01 | Melihat halaman beranda | Buka `/` | Halaman tampil dengan header, produk featured, footer |
| FT-02 | Melihat katalog produk | Buka `/products` | Daftar produk ditampilkan dalam grid, paginasi berfungsi |
| FT-03 | Mencari produk by nama | Ketik "ROG" di search bar | Produk dengan nama mengandung "ROG" ditampilkan |
| FT-04 | Filter by kategori | Klik kategori "Laptop" | Hanya produk kategori Laptop yang tampil |
| FT-05 | Sort by harga asc | Pilih "Harga: Termurah" | Produk terurut dari harga terendah ke tertinggi |
| FT-06 | Sort by harga desc | Pilih "Harga: Termahal" | Produk terurut dari harga tertinggi ke terendah |
| FT-07 | Sort by rating | Pilih "Rating Tertinggi" | Produk terurut dari rating 5.0 ke 0.0 |
| FT-08 | Sort by popularity | Pilih "Terpopuler" | Produk terurut dari popularitas tertinggi |
| FT-09 | Lihat detail produk | Klik product card | Halaman detail tampil dengan info lengkap |
| FT-10 | Admin login berhasil | Masukkan kredensial valid | Redirect ke dashboard admin |
| FT-11 | Admin login gagal | Masukkan kredensial invalid | Pesan error ditampilkan |
| FT-12 | Admin tambah produk | Isi form → Submit | Produk baru muncul di tabel, BST terupdate |
| FT-13 | Admin edit produk | Ubah field → Update | Data produk berubah di tabel |
| FT-14 | Admin hapus produk | Klik Delete → Konfirmasi | Produk hilang dari tabel |
| FT-15 | Akses admin tanpa login | Buka `/admin` langsung | Redirect ke halaman login |
| FT-16 | Halaman 404 | Buka URL yang tidak ada | Halaman 404 custom ditampilkan |

## 16.2 Algorithm Testing

### Pengujian BST

| No | Test Case | Input | Expected Output |
|----|-----------|-------|-----------------|
| BST-01 | Insert ke BST kosong | Insert "Monitor LG" | Tree root = "monitor lg" |
| BST-02 | Insert multiple | Insert "C", "A", "B" | Inorder = ["a", "b", "c"] |
| BST-03 | Search ada | Search "Laptop ASUS" | Return product data |
| BST-04 | Search tidak ada | Search "Produk XYZ" | Return null |
| BST-05 | Delete leaf node | Delete node tanpa child | Node hilang, tree valid |
| BST-06 | Delete node 1 child | Delete node dengan 1 child | Child menggantikan node, tree valid |
| BST-07 | Delete node 2 children | Delete node dengan 2 child | Inorder successor menggantikan, tree valid |
| BST-08 | Inorder traversal | Traverse tree | Array terurut ascending |
| BST-09 | Insert duplikat key | Insert nama yang sama | Handle gracefully (update atau reject) |
| BST-10 | BST kategori search | Search kategori "Laptop" | Return array semua produk Laptop |
| BST-11 | Build dari array | Build dari 100 produk | BST valid, inorder terurut |
| BST-12 | Prefix search | Search prefix "AS" | Return produk: "ASUS...", "Acer..." |

### Pengujian Quick Sort

| No | Test Case | Input | Expected Output |
|----|-----------|-------|-----------------|
| QS-01 | Array kosong | `[]` | `[]` |
| QS-02 | Array 1 elemen | `[5]` | `[5]` |
| QS-03 | Array terurut (asc) | `[1,2,3,4,5]` sortBy asc | `[1,2,3,4,5]` |
| QS-04 | Array terurut (desc) | `[5,4,3,2,1]` sortBy asc | `[1,2,3,4,5]` |
| QS-05 | Array random | `[3,1,4,1,5,9]` sortBy asc | `[1,1,3,4,5,9]` |
| QS-06 | Array dengan duplikat | `[5,3,5,1,3]` sortBy asc | `[1,3,3,5,5]` |
| QS-07 | Sort by price asc | Products dengan harga bervariasi | Harga terendah → tertinggi |
| QS-08 | Sort by price desc | Products dengan harga bervariasi | Harga tertinggi → terendah |
| QS-09 | Sort by rating desc | Products dengan rating bervariasi | Rating tertinggi → terendah |
| QS-10 | Sort by popularity asc | Products dengan popularity bervariasi | Popularity terendah → tertinggi |
| QS-11 | Array besar (1000) | 1000 random products | Terurut dengan benar |
| QS-12 | Array semua sama | `[5,5,5,5,5]` | `[5,5,5,5,5]` (stabil) |

## 16.3 Performance Testing

### BST vs Linear Search

| Ukuran Data | BST Search (target) | Linear Search (target) | Speedup |
|:-----------:|:-------------------:|:----------------------:|:-------:|
| 100 | < 0.1ms | < 0.5ms | ~5× |
| 500 | < 0.5ms | < 2ms | ~4× |
| 1.000 | < 1ms | < 5ms | ~5× |
| 5.000 | < 2ms | < 25ms | ~12× |
| 10.000 | < 3ms | < 50ms | ~17× |

### Quick Sort vs Bubble Sort

| Ukuran Data | Quick Sort (target) | Bubble Sort (target) | Speedup |
|:-----------:|:-------------------:|:--------------------:|:-------:|
| 100 | < 1ms | < 5ms | ~5× |
| 500 | < 3ms | < 50ms | ~17× |
| 1.000 | < 5ms | < 200ms | ~40× |
| 5.000 | < 20ms | < 5.000ms | ~250× |
| 10.000 | < 50ms | < 20.000ms | ~400× |

**Metrik yang diukur:**
- Waktu eksekusi (ms) — menggunakan `performance.now()`
- Jumlah perbandingan (comparisons)
- Jumlah pertukaran (swaps) — untuk Quick Sort

> [!TIP]
> Implementasikan Bubble Sort **hanya untuk benchmark perbandingan**, bukan sebagai fitur utama. Ini akan sangat memperkuat presentasi tugas akhir karena menunjukkan secara kuantitatif mengapa Quick Sort lebih superior.

---

# 17. Risiko dan Mitigasi

| No | Risiko | Dampak | Probabilitas | Mitigasi |
|----|--------|:------:|:------------:|----------|
| R-01 | **Sinkronisasi BST dengan database tidak konsisten** — BST di memory tidak sinkron setelah crash/restart | Tinggi | Sedang | BST rebuild otomatis saat cold start. Semua operasi CRUD update BST dan DB secara bersamaan (double write). |
| R-02 | **BST worst-case (skewed tree)** — data diinsert secara terurut menyebabkan tree menjadi linked list, $O(n)$ | Sedang | Sedang | Shuffle data saat build BST. Implementasikan detection untuk tree height. Rebuild periodik. Dokumentasikan sebagai trade-off di presentasi. |
| R-03 | **Quick Sort worst-case** — pivot selalu memilih elemen terkecil/terbesar | Rendah | Rendah | Gunakan Median-of-Three pivot. Dokumentasikan worst-case scenario di presentasi. |
| R-04 | **Vercel serverless cold start** — BST hilang dari memory saat function di-recycle | Tinggi | Tinggi | Gunakan singleton pattern. BST lazy-init saat pertama kali dipanggil. Catat waktu rebuild sebagai overhead. |
| R-05 | **Deadline pengerjaan** — proyek tidak selesai tepat waktu | Tinggi | Sedang | Prioritaskan fitur inti (BST + Quick Sort). Fitur opsional (visualisasi BST, benchmark UI) dikerjakan terakhir. Gunakan timeline mingguan. |
| R-06 | **Konflik merge Git** — multiple developer mengedit file yang sama | Sedang | Sedang | Pembagian tugas yang jelas per file/folder. Gunakan feature branch. Code review sebelum merge. Pull terbaru sebelum push. |
| R-07 | **Neon PostgreSQL connection limit** — free tier memiliki batasan koneksi | Sedang | Rendah | Gunakan connection pooling via Prisma. Neon free tier mendukung ~100 concurrent connections, cukup untuk proyek kecil. |
| R-08 | **Performa lambat pada dataset besar** — >5000 produk memperlambat rebuild BST | Rendah | Rendah | Implementasikan paginasi di DB level. BST cukup menyimpan key + reference, bukan full object. |
| R-09 | **Kurangnya pemahaman anggota tim terhadap BST/Quick Sort** | Sedang | Sedang | Pair programming. Buat dokumentasi algoritma internal. Review bersama sebelum implementasi. |
| R-10 | **Type error / runtime error pada TypeScript** | Rendah | Sedang | Strict TypeScript config. Test algoritma secara independen sebelum integrasi. |

---

# 18. Pembagian Tugas Tim

> [!NOTE]
> Asumsi: Tim terdiri dari **4–5 orang**. Pembagian berikut menggunakan 5 orang. Jika 4 orang, gabungkan peran 4 & 5.

## Rekomendasi Pembagian (5 Orang)

| Anggota | Peran | Tanggung Jawab Utama |
|:-------:|-------|----------------------|
| **A1** | **Lead Developer & Algoritma** | Implementasi BST (bst.ts, bst-name.ts, bst-category.ts), Quick Sort (quicksort.ts), BST Manager, benchmark, unit testing algoritma. **Peran paling kritis — harus paham SDA.** |
| **A2** | **Backend Developer** | API Routes (semua endpoint), Prisma schema, database setup, seed data, auth (login/logout/middleware), integrasi BST ke API, error handling. |
| **A3** | **Frontend Developer (Public)** | Halaman publik (Home, Catalog, Detail), komponen SearchBar, SortDropdown, CategoryFilter, ProductCard, ProductGrid, Pagination, Navbar, Footer. Fokus UI/UX. |
| **A4** | **Frontend Developer (Admin)** | Halaman admin (Login, Dashboard, Product Table, Add/Edit Product), komponen ProductForm, ProductTable, Modal, Sidebar. Auth guard di frontend. |
| **A5** | **DevOps, Testing & Dokumentasi** | Setup project Next.js, Tailwind config, TypeScript config, Git workflow, deployment Vercel + Neon, functional testing, performance testing, menulis README dan laporan, presentasi. |

## Shared Responsibilities

Semua anggota bertanggung jawab atas:
- Code review (minimal 1 reviewer per PR)
- Git discipline (branch naming, commit message)
- Komunikasi rutin (standup meeting minimal 2×/minggu)

## Dependensi Antar Peran

```mermaid
graph TD
    A1["A1: Algoritma<br/>(BST + Quick Sort)"] --> A2["A2: Backend<br/>(API Routes)"]
    A2 --> A3["A3: Frontend Public<br/>(Catalog, Search, Sort)"]
    A2 --> A4["A4: Frontend Admin<br/>(Dashboard, CRUD)"]
    A5["A5: DevOps & Testing"] --> A1
    A5 --> A2
    A5 --> A3
    A5 --> A4

    style A1 fill:#10b981,stroke:#059669,color:#fff
    style A2 fill:#3b82f6,stroke:#2563eb,color:#fff
    style A3 fill:#f59e0b,stroke:#d97706,color:#000
    style A4 fill:#ef4444,stroke:#dc2626,color:#fff
    style A5 fill:#8b5cf6,stroke:#7c3aed,color:#fff
```

---

# 19. Timeline Proyek

> [!NOTE]
> Timeline berikut mengasumsikan durasi pengerjaan **6 minggu** (tipikal untuk tugas akhir SDA). Sesuaikan dengan deadline aktual mata kuliah Anda.

## Timeline Mingguan

| Minggu | Fase | Aktivitas | PIC | Deliverables |
|:------:|------|-----------|:---:|-------------|
| **1** | **Analisis & Setup** | • Finalisasi requirement<br/>• Setup repository GitHub<br/>• Setup project Next.js + TypeScript + Tailwind<br/>• Setup Neon PostgreSQL + Prisma<br/>• Desain database schema<br/>• Prisma migrate + seed data awal | A5, A2 | Repository siap, DB schema final, seed data, project running locally |
| **2** | **Implementasi Algoritma** | • Implementasi BST class (insert, search, delete, traversal)<br/>• Implementasi BST by Name<br/>• Implementasi BST by Category<br/>• Implementasi Quick Sort (median-of-three)<br/>• Unit testing algoritma<br/>• BST Manager (build, rebuild, sync) | A1, A5 | BST dan Quick Sort berfungsi, lulus unit test |
| **3** | **Backend API** | • Implementasi semua API Routes<br/>• Integrasi BST ke search endpoint<br/>• Integrasi Quick Sort ke sort endpoint<br/>• Auth middleware (JWT)<br/>• Login/Logout endpoint<br/>• Error handling dan validasi | A2, A1 | Semua API endpoint fungsional, tested via Postman/Thunder Client |
| **4** | **Frontend Public** | • Halaman Home (landing page)<br/>• Halaman Catalog (search + filter + sort)<br/>• Halaman Product Detail<br/>• Komponen UI (Navbar, Footer, Card, dll.)<br/>• Responsive design<br/>• Integrasi API ke frontend | A3, A4 | Halaman publik fungsional dan responsif |
| **5** | **Frontend Admin + Polish** | • Halaman Admin Login<br/>• Halaman Dashboard<br/>• Halaman Product Table (CRUD)<br/>• Form Add/Edit Product<br/>• Auth guard di frontend<br/>• UI polish, animasi, dark mode<br/>• Performance optimization | A4, A3 | Halaman admin fungsional, UI polished |
| **6** | **Testing, Deployment & Presentasi** | • Functional testing (semua skenario)<br/>• Performance testing (BST vs Linear, Quick Sort vs Bubble Sort)<br/>• Bug fixing<br/>• Deploy ke Vercel<br/>• Dokumentasi (README, laporan)<br/>• Persiapan presentasi<br/>• Rehearsal presentasi | ALL | Aplikasi live di Vercel, laporan selesai, presentasi siap |

## Gantt Chart (Simplified)

```
Minggu:     1         2         3         4         5         6
           |---------|---------|---------|---------|---------|---------|
Analisis   |█████████|         |         |         |         |         |
Setup      |█████████|         |         |         |         |         |
Algoritma  |    ░░░░░|█████████|███      |         |         |         |
Backend    |         |    ░░░░░|█████████|██       |         |         |
Frontend P |         |         |    ░░░░░|█████████|███      |         |
Frontend A |         |         |         |    ░░░░░|█████████|         |
Testing    |         |         |         |         |    ░░░░░|█████████|
Deploy     |         |         |         |         |         |█████████|
Presentasi |         |         |         |         |         |█████████|

█ = Aktif   ░ = Persiapan/Overlap
```

---

# 20. Rekomendasi Final

## 20.1 Evaluasi Kesesuaian dengan Tujuan Mata Kuliah SDA

> **✅ Desain ini SESUAI dengan tujuan mata kuliah Struktur Data dan Algoritma.**

| Aspek | Evaluasi |
|-------|----------|
| **BST sebagai inti** | BST digunakan sebagai mekanisme pencarian utama (bukan hanya aksesoris). Dua BST terpisah (nama & kategori) menunjukkan pemahaman mendalam tentang properti BST dan trade-off desain. |
| **Quick Sort sebagai inti** | Quick Sort diimplementasikan manual (bukan `Array.sort()`) dengan Median-of-Three pivot. Digunakan untuk 6 varian sorting yang berbeda. |
| **Operasi lengkap** | Insert, Search, Delete, Traversal, Update — semua operasi fundamental BST diimplementasikan dalam konteks nyata. |
| **Analisis kompleksitas** | Setiap operasi didokumentasikan dengan kompleksitas waktu dan ruang (best, average, worst case). |
| **Perbandingan performa** | BST vs Linear Search dan Quick Sort vs Bubble Sort memberikan bukti kuantitatif mengapa SDA penting. |

## 20.2 Evaluasi Tech Stack

> **✅ Stack Next.js + TypeScript + Tailwind + Prisma + Neon + Vercel sudah TEPAT.**

| Stack | Evaluasi | Skor |
|-------|----------|:----:|
| **Next.js** | Full-stack framework yang memungkinkan BST dan Quick Sort diimplementasikan di server-side (API Routes) sekaligus memberikan frontend modern. App Router + Server Components cocok. | ⭐⭐⭐⭐⭐ |
| **TypeScript** | Type safety membantu mendefinisikan BSTNode, Product, dan parameter Quick Sort dengan jelas. Mengurangi runtime error. Sangat sesuai. | ⭐⭐⭐⭐⭐ |
| **Tailwind CSS** | Mempercepat development UI tanpa mengurangi fokus pada algoritma. Responsive design out-of-the-box. | ⭐⭐⭐⭐⭐ |
| **Prisma** | ORM yang type-safe, mudah digunakan dengan TypeScript. Schema-first approach mempermudah desain database. | ⭐⭐⭐⭐⭐ |
| **Neon PostgreSQL** | PostgreSQL cloud dengan free tier yang cukup. Serverless-friendly, cocok dengan Vercel. | ⭐⭐⭐⭐ |
| **Vercel** | Deployment seamless untuk Next.js. Auto-deploy dari GitHub. Free tier cukup untuk demo. | ⭐⭐⭐⭐⭐ |

> [!TIP]
> Stack ini tidak mengaburkan implementasi SDA. BST dan Quick Sort tetap ditulis manual di `lib/algorithms/`, terpisah dari framework. Framework hanya membantu "membungkus" algoritma dalam aplikasi web yang fungsional.

## 20.3 Apakah BST dan Quick Sort Terlihat sebagai Inti Proyek?

> **✅ Ya, BST dan Quick Sort adalah INTI proyek, bukan fitur tambahan.**

Bukti:
1. **Setiap pencarian** di aplikasi melewati BST — bukan query SQL `LIKE`.
2. **Setiap sorting** di aplikasi menggunakan Quick Sort manual — bukan `ORDER BY` SQL atau `Array.sort()`.
3. **Statistik performa** ditampilkan di UI — menunjukkan waktu eksekusi algoritma secara transparan.
4. **Perbandingan benchmark** (BST vs Linear, Quick Sort vs Bubble Sort) menjadi bagian dari testing dan presentasi.
5. **Folder `lib/algorithms/`** didedikasikan khusus untuk implementasi SDA.

## 20.4 Hal yang Perlu Diperbaiki/Diperhatikan Sebelum Implementasi

> [!IMPORTANT]
> **5 hal kritis yang perlu diperhatikan:**

| No | Item | Detail |
|----|------|--------|
| 1 | **Serverless BST persistence** | Vercel serverless function bisa cold start kapan saja. Pastikan BST manager menghandle rebuild dengan efisien (lazy init + singleton pattern). Pertimbangkan menambahkan logging untuk memantau kapan rebuild terjadi. |
| 2 | **Tailwind CSS version** | User meminta Tailwind CSS — pastikan menggunakan versi terbaru (v4) yang kompatibel dengan Next.js yang digunakan. Konfigurasi Tailwind harus dilakukan di awal. |
| 3 | **BST untuk pencarian partial/fuzzy** | BST secara native hanya mendukung exact match dan prefix match. Untuk pencarian yang lebih fleksibel (misal "ROG" untuk "ASUS ROG Strix"), mungkin perlu kombinasi BST prefix search + post-filtering. Definisikan perilaku pencarian yang diharapkan sebelum coding. |
| 4 | **Seed data yang realistis** | Siapkan minimal 50–100 produk seed data yang realistis dengan nama, harga, rating, dan spesifikasi yang masuk akal. Data ini penting untuk demonstrasi dan testing performa. |
| 5 | **Skema presentasi** | Rencanakan demo flow untuk presentasi: tunjukkan pencarian BST, bandingkan dengan linear search, tunjukkan Quick Sort, bandingkan dengan Bubble Sort. Prepare worst-case scenario BST (skewed tree) sebagai poin diskusi. |

## 20.5 Kesimpulan

BinaryMart memiliki desain yang **solid, realistis, dan sesuai tujuan akademis**. Arsitekturnya memisahkan implementasi SDA (`lib/algorithms/`) dari concern web framework, sehingga dosen/penguji dapat mengevaluasi pemahaman BST dan Quick Sort secara terpisah dari kemampuan web development.

Dengan timeline 6 minggu dan pembagian tugas yang jelas, proyek ini **sangat layak** untuk diimplementasikan sebagai tugas akhir mata kuliah Struktur Data dan Algoritma.

---

> **Dokumen ini siap dijadikan acuan implementasi. Tidak ada kode yang dihasilkan — hanya perencanaan.**
