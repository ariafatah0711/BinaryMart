# INFO.md — BinaryMart

> **Proyek Akhir Mata Kuliah Struktur Data dan Algoritma (SDA)**  
> **S2 NF Computer — 2026**

---

## 1. Identitas Proyek

| Item | Detail |
|------|--------|
| **Nama Aplikasi** | BinaryMart |
| **Tema** | Sistem Katalog Produk Elektronik |
| **Mata Kuliah** | Struktur Data dan Algoritma (SDA) |
| **Tahun** | 2026 |
| **Status** | Draft — Menunggu Persetujuan |

**Aplikasi ini adalah sistem katalog produk elektronik berbasis web yang mengimplementasikan Binary Search Tree (BST) untuk pencarian produk dan algoritma QuickSort untuk pengurutan produk — keduanya diimplementasikan secara manual (tidak menggunakan built-in method) sebagai bukti pemahaman konsep SDA.**

---

## 2. Tech Stack

| Layer | Teknologi | Versi |
|-------|-----------|-------|
| **Framework** | Next.js (App Router) | ^14.2.21 |
| **Bahasa** | TypeScript | ^5 |
| **Styling** | Tailwind CSS | ^3.4 |
| **Database** | Neon PostgreSQL (Serverless) | — |
| **ORM** | Prisma | 5.15.0 |
| **Auth** | Custom JWT (Web Crypto API HS256) + scrypt | — |
| **Deploy** | Vercel (Serverless Functions) | — |
| **Design System** | Helios (HashiCorp-inspired) | — |

**Dependencies (produksi):** `next`, `react` ^18, `react-dom` ^18, `@prisma/client` 5.15.0  
**Dependencies (dev):** `typescript` ^5, `tailwindcss` ^3.4, `prisma` 5.15.0, `eslint` ^8

---

## 3. Database Schema (Prisma)

### 3.1 Model Product

```
Product {
  id             String   @id @default(cuid())
  name           String   @unique
  slug           String   @unique
  category       String
  brand          String
  price          Float
  rating         Float    @default(0)
  popularity     Int      @default(0)
  stock          Int      @default(0)
  description    String   @db.Text
  image          String
  specifications Json     @default("{}")
  isActive       Boolean  @default(true)       // Soft delete flag
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  @@index([category])
  @@index([brand])
  @@index([price])
  @@index([rating])
  @@index([popularity])
  @@index([isActive])
}
```

**Catatan:** Tidak ada relasi langsung dengan Admin. `isActive` digunakan untuk soft delete — produk tidak pernah benar-benar dihapus dari database, hanya disembunyikan dari tampilan publik.

### 3.2 Model Admin

```
enum AdminRole { ADMIN, SUPER_ADMIN }

Admin {
  id          String    @id @default(cuid())
  username    String    @unique
  password    String                            // scrypt: salt:hash
  name        String
  email       String    @unique
  role        AdminRole @default(ADMIN)
  isActive    Boolean   @default(true)
  lastLoginAt DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@index([role])
  @@index([isActive])
}
```

**Password Storage:** Format `scrypt:<salt>:<hash>` menggunakan Node.js `crypto.scryptSync` dengan 64-byte hash dan timing-safe comparison.

### 3.3 Seed Data

- **1 Admin:** username `admin`, password `admin123`, role `SUPER_ADMIN`
- **5 Products:** Laptop ASUS ROG, iPhone 15 Pro, Monitor LG UltraGear, Keyboard Keychron K2, Mouse Logitech G Pro X

---

## 4. Implementasi Algoritma

### 4.1 Binary Search Tree (BST)

**File:** `src/lib/algorithms/bst.ts`, `bst-name.ts`, `bst-kategory.ts`, `bst-manager.ts`

#### Struktur Node

```typescript
class TreeNode<T extends SearchableProduct> {
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;
  constructor(public key: string, public product: T) {}
}
```

#### Operasi Insert

```typescript
private insertNode(node, key, product): TreeNode<T> {
  if (!node) return new TreeNode(key, product);
  if (key < node.key)
    node.left = this.insertNode(node.left, key, product);
  else
    node.right = this.insertNode(node.right, key, product);
  return node;
}
```

- **Strategi:** Rekursif. Key = `product.name.toLowerCase()`. Nama yang lebih kecil secara alfabet ke kiri, sisanya ke kanan.
- **Kompleksitas:** Rata-rata `O(log n)`, worst case `O(n)` jika tree menjadi skewed.

#### Operasi Search

```typescript
search(term: string): T[] {
  const results: T[] = [];
  this.collectMatches(this.root, term.toLowerCase(), results);
  return results;
}

private collectMatches(node, term, results) {
  if (!node) return;
  this.collectMatches(node.left, term, results);

  // Inorder traversal + substring matching
  const haystack = `${product.name} ${product.category} ${product.brand}`.toLowerCase();
  if (haystack.includes(term)) results.push(product);

  this.collectMatches(node.right, term, results);
}
```

- **Strategi:** Inorder traversal + substring matching (`String.includes()`). Mencocokkan term pada gabungan name, category, dan brand.
- **Kompleksitas:** `O(n)` karena traversal seluruh node (bukan search murni BST karena menggunakan substring, bukan exact/prefix match).

#### Arsitektur 2 BST Terpisah

```typescript
class BSTManager<T> {
  private nameTree = new ProductNameTree<T>();
  private categoryTree = new ProductCategoryTree<T>();

  build(products) {
    for (const product of products) {
      this.nameTree.insert(product);      // Key: product.name
      this.categoryTree.insert(product);  // Key: product.category
    }
  }
}
```

**Mengapa 2 BST?** BST hanya mendukung satu key per tree. Untuk pencarian berdasarkan dua dimensi (nama dan kategori), diperlukan dua tree terpisah. `BSTManager` mengelola lifecycle keduanya.

### 4.2 QuickSort

**File:** `src/lib/algorithms/quicksort.ts`

#### Implementasi

```typescript
export function quickSort<T>(items: T[], compare: (left: T, right: T) => number): T[] {
  if (items.length <= 1) return items;

  const [pivot, ...rest] = items;               // Pivot: first element
  const lower: T[] = [];
  const higher: T[] = [];

  rest.forEach((item) => {
    if (compare(item, pivot) < 0) lower.push(item);
    else higher.push(item);
  });

  return [...quickSort(lower, compare), pivot, ...quickSort(higher, compare)];
}

export function withOrder<T>(
  compare: (left: T, right: T) => number,
  order: SortOrder
) {
  return order === 'asc' ? compare : (left: T, right: T) => compare(right, left);
}
```

#### Detail Teknis

| Aspek | Implementasi |
|-------|-------------|
| **Pendekatan** | Functional (non-in-place) — membuat array baru setiap rekursi |
| **Strategi Pivot** | First-element (`const [pivot, ...rest] = items`) |
| **Comparator** | Dynamic — menerima fungsi pembanding yang dikonfigurasi per field |
| **Order** | Asc/desc via `withOrder()` wrapper |
| **Kompleksitas Waktu** | Rata-rata `O(n log n)`, worst case `O(n²)` (data sudah terurut) |
| **Kompleksitas Ruang** | `O(n)` — bukan in-place, memori tambahan untuk array lower/higher |

#### Deviasi dari Rencana

> **Rencana (`implementation_plan.md`):** Median-of-Three pivot + in-place partitioning  
> **Realisasi:** First-element pivot + functional (non-in-place)

#### Cara Kerja di Sistem

```typescript
// GET /api/products?sort=price&order=asc
// 1. Ambil produk dari database (via Prisma)
let products = await prisma.product.findMany({ where: { isActive: true } });

// 2. QuickSort dengan comparator dinamis
products = quickSort(products, withOrder(compareProducts('price'), 'asc'));

// compareProducts membuat fungsi pembanding untuk field tertentu
function compareProducts(field) {
  return (left, right) => {
    if (typeof field === 'string')
      return left[field].localeCompare(right[field]);
    return Number(left[field]) - Number(right[field]);
  };
}
```

---

## 5. Arsitektur Sistem

```
Client (Browser)                  Server (Vercel Serverless)
┌─────────────────┐              ┌──────────────────────────────────┐
│  Next.js React   │  fetch()    │  Next.js API Routes              │
│  Frontend        │ ──────────► │  ┌─────────────┐ ┌───────────┐  │
│  (SSR + Client)  │             │  │ BST Engine   │ │ QuickSort │  │
└─────────────────┘              │  │ (in-memory)  │ │ Engine    │  │
                                 │  └─────────────┘ └───────────┘  │
                                 │  ┌──────────────┐                │
                                 │  │ Auth JWT     │                │
                                 │  │ Middleware    │                │
                                 │  └──────────────┘                │
                                 │         │                        │
                                 │         ▼                        │
                                 │  ┌──────────────┐                │
                                 │  │ Prisma ORM   │                │
                                 │  └──────┬───────┘                │
                                 └─────────┼────────────────────────┘
                                           │ SQL
                                           ▼
                                 ┌──────────────────┐
                                 │ Neon PostgreSQL  │
                                 │ (Serverless DB)  │
                                 └──────────────────┘
```

### Alur Pencarian + Sorting

```
GET /api/products?search=rog&sort=price&order=asc
  │
  ├─ 1. Prisma: SELECT * FROM Product WHERE isActive = true
  │      (plus filter category jika ada)
  │
  ├─ 2. BST: Build tree in-memory dari array produk
  │      tree = new ProductSearchTree()
  │      products.forEach(p => tree.insert(p))
  │
  ├─ 3. BST: Inorder traversal + substring matching
  │      results = tree.search("rog")
  │
  └─ 4. QuickSort: Urutkan hasil pencarian
       sorted = quickSort(results, withOrder(compareProducts('price'), 'asc'))
       
       Response → { products: sorted[], meta: { algorithm: { search: "BST", sort: "QuickSort" } } }
```

### Alur Auth

```
POST /api/auth/login  { username, password }
  → verifyPassword() via scrypt
  → signAdminToken() via Web Crypto API HS256
  → Set HTTP-only cookie: binarymart_admin_token
  → Response: { success: true, data: admin }

Middleware (middleware.ts):
  /admin/* + /api/admin/* + POST/PUT/DELETE /api/products/*
  → Read cookie → verifyAdminToken()
  → Valid  → proceed
  → Invalid → redirect /admin/login (page) | 401 (API)
```

---

## 6. Halaman & Route Map

### Public Pages

| Route | File | Deskripsi |
|-------|------|-----------|
| `/` | `src/app/(public)/page.tsx` | Landing page: Hero, StatsBar, Features, Featured Products, CTA |
| `/catalog` | `src/app/(public)/catalog/page.tsx` | Product catalog: search (BST), filter kategori, sort (QuickSort), pagination 6/page, skeleton loading |
| `/products/[id]` | `src/app/(public)/products/[id]/page.tsx` | Detail produk: image, specs, price, rating, stock |
| `/algorithms` | `src/app/(public)/algorithms/page.tsx` | Visualisasi interaktif BST & QuickSort step-by-step |

### Admin Pages

| Route | File | Deskripsi |
|-------|------|-----------|
| `/admin/login` | `src/app/admin/(auth)/login/page.tsx` | Login form |
| `/admin` or `/admin/dashboard` | `src/app/admin/(dashboard)/dashboard/page.tsx` | Dashboard: total produk, stock, kategori, recent products |
| `/admin/products` | `src/app/admin/(dashboard)/products/page.tsx` | Table CRUD: Edit / Delete (soft) |
| `/admin/products/add` | `src/app/admin/(dashboard)/products/add/page.tsx` | Form tambah produk |
| `/admin/products/edit/[id]` | `src/app/admin/(dashboard)/products/edit/[id]/page.tsx` | Form edit produk (pre-filled) |

### API Routes

| Method | Endpoint | Auth | Fungsi |
|--------|----------|:----:|--------|
| GET | `/api/products` | ✗ | List produk + search (BST) + sort (QuickSort) |
| POST | `/api/products` | ✓ | Tambah produk |
| GET | `/api/products/[id]` | ✗ | Detail produk (by id atau slug) |
| PUT | `/api/products/[id]` | ✓ | Update produk |
| DELETE | `/api/products/[id]` | ✓ | Soft delete (set `isActive = false`) |
| POST | `/api/auth/login` | ✗ | Login admin |
| GET | `/api/auth/me` | ✓ | Session check |
| POST | `/api/auth/logout` | ✗ | Logout + clear cookie |

### Komponen UI Utama

**Public:** Navbar, HeroSection, Hero, FeaturesSection, Features, StatsBar, ProductsSection, ProductImage, CTASection, Footer, DBStatusIndicator  
**Admin:** Sidebar, ProductTable, ProductForm, DeleteModal  
**Lainnya:** ProductImage (fallback SVG on error)

---

## 7. Kompleksitas Algoritma — Ringkasan

| Algoritma | Operasi | Average Case | Worst Case | Ruang |
|-----------|---------|:------------:|:----------:|:-----:|
| BST | Insert | O(log n) | O(n) | O(n) |
| BST | Search (substring via inorder) | O(n) | O(n) | O(n) |
| BST | Build Tree (n inserts) | O(n log n) | O(n²) | O(n) |
| QuickSort | Sort (first-element pivot) | O(n log n) | O(n²) | O(n) |

---

## 8. Cara Menjalankan

```bash
# 1. Install dependencies
npm install

# 2. Setup environment
# Buat file .env dengan:
# DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
# DIRECT_URL=postgresql://user:pass@host/db?sslmode=require
# JWT_SECRET=your-secret-key

# 3. Setup database & seed
npx prisma db push
npm run seed

# 4. Run development
npm run dev
# → http://localhost:3000

# 5. Build production
npm run build
```

**Default Admin:** username `admin`, password `admin123`

---

## 9. Catatan Deviasi dari Rencana Awal

| Aspek | implementation_plan.md | Realisasi |
|-------|----------------------|-----------|
| **QuickSort Pivot** | Median-of-Three | First-element (`const [pivot, ...rest]`) |
| **QuickSort Strategy** | In-place partitioning | Functional (non-in-place, array baru setiap rekursi) |
| **Folder Structure** | Ada `types/`, `hooks/`, `services/`, `utils/` | Tidak ada — logic di `lib/` & inline komponen |
| **Halaman Algorithms** | Tidak disebut | Ada — visualisasi interaktif BST & QuickSort |
| **Benchmark** | Bubble Sort comparison | Tidak diimplementasi |
| **Delete** | Hard delete | Soft delete (`isActive = false`) |
| **Admin Model** | username, password, name, email | Ditambah: `role` (enum), `isActive`, `lastLoginAt` |
| **BST Search** | Prefix/autocomplete | Substring matching via inorder traversal |
| **API Search Route** | `/api/products/search` terpisah | Search via query params `?search=` di `/api/products` |

---

## 10. Struktur Folder Aktual

```
BinaryMart/
├── src/
│   ├── app/
│   │   ├── (public)/              # Public pages (Home, Catalog, Product Detail)
│   │   │   ├── page.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── catalog/page.tsx
│   │   │   ├── products/[id]/page.tsx
│   │   │   └── algorithms/page.tsx
│   │   ├── admin/
│   │   │   ├── page.tsx           # Redirect to dashboard/login
│   │   │   ├── layout.tsx
│   │   │   ├── (auth)/login/page.tsx
│   │   │   └── (dashboard)/
│   │   │       ├── layout.tsx     # Sidebar + auth guard
│   │   │       ├── dashboard/page.tsx
│   │   │       └── products/
│   │   │           ├── page.tsx
│   │   │           ├── add/page.tsx
│   │   │           └── edit/[id]/page.tsx
│   │   ├── api/
│   │   │   ├── products/route.ts
│   │   │   ├── products/[id]/route.ts
│   │   │   ├── auth/login/route.ts
│   │   │   ├── auth/logout/route.ts
│   │   │   ├── auth/me/route.ts
│   │   │   └── admin/me/route.ts
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── Navbar.tsx, Footer.tsx, Hero*.tsx, Features*.tsx
│   │   ├── StatsBar.tsx, ProductsSection.tsx, ProductImage.tsx
│   │   ├── CTASection.tsx, DBStatusIndicator.tsx
│   │   └── admin/
│   │       └── Sidebar.tsx
│   ├── lib/
│   │   ├── algorithms/            # ⭐ Inti SDA
│   │   │   ├── bst.ts             # BST node & tree (generic)
│   │   │   ├── bst-name.ts        # BST by product name
│   │   │   ├── bst-kategory.ts    # BST by category
│   │   │   ├── bst-manager.ts     # Manages 2 BSTs
│   │   │   └── quicksort.ts       # QuickSort implementation
│   │   ├── db.ts                  # Prisma singleton
│   │   ├── jwt.ts                 # JWT sign/verify (Web Crypto API)
│   │   ├── session.ts             # Cookie session reader
│   │   ├── password.ts            # scrypt hash/verify
│   │   ├── slug.ts                # URL slug generator
│   │   ├── validation.ts          # Product input validation
│   │   └── api-response.ts        # Response helpers
│   └── scripts/push-env.mjs
├── prisma/
│   ├── schema.prisma
│   └── seed.js
├── middleware.ts                   # Auth middleware
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.mjs
└── postcss.config.mjs
```

---

## 11. API Response Format

**Sukses:**
```json
{
  "success": true,
  "data": {
    "database": "connected",
    "meta": {
      "total": 5,
      "search": "rog",
      "category": null,
      "sort": "price",
      "order": "asc",
      "algorithm": {
        "search": "Binary Search Tree",
        "sort": "QuickSort"
      }
    },
    "products": [ ... ]
  }
}
```

**Error:**
```json
{
  "success": false,
  "error": "Unauthorized"
}
```

---

## 12. Query Parameters (GET /api/products)

| Parameter | Tipe | Contoh | Fungsi |
|-----------|------|--------|--------|
| `search` | string | `?search=rog` | Pencarian via BST (name + category + brand) |
| `category` | string | `?category=Laptop` | Filter kategori (case-insensitive) |
| `sort` | string | `?sort=price` | Field sorting: name, price, rating, popularity, createdAt |
| `order` | string | `?order=desc` | Ascending (default) atau descending |

---

## 13. Komponen Utama & Fungsinya

| Komponen | File | Fungsi |
|----------|------|--------|
| ProductSearchTree | `bst.ts` | BST generic: insert, search, inorder traversal |
| ProductNameTree | `bst-name.ts` | Extends ProductSearchTree — search by name |
| ProductCategoryTree | `bst-kategory.ts` | Extends ProductSearchTree — search by category |
| BSTManager | `bst-manager.ts` | Build & manage 2 BSTs simultaneously |
| quickSort | `quicksort.ts` | QuickSort functional + withOrder wrapper |
| parseProductInput | `validation.ts` | Validasi + slug auto-generate |
| signAdminToken / verifyAdminToken | `jwt.ts` | JWT HS256 via Web Crypto API |
| hashPassword / verifyPassword | `password.ts` | scrypt + timing-safe comparison |

---

*Dokumen ini dibuat sebagai lampiran laporan proyek akhir mata kuliah Struktur Data dan Algoritma.*
