Sistem Katalog Produk Elektronik Menggunakan Binary Search Tree dan Quick Sort

## BinaryMart Backend

BinaryMart uses Next.js App Router API routes with Prisma and PostgreSQL.

## Getting Started

Install dependencies, then run the app:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Useful commands:

```bash
npx prisma validate
npx prisma db push
npm run seed
npm run build
```

Default seeded admin:

```txt
username: admin
password: admin123
```

## Deployment
deploy to vercel with CLI:

```bash
vercel link

vercel --prod
```

## Auth Flow

Login endpoint:

```txt
POST /api/auth/login
```

Request body:

```json
{
  "username": "admin",
  "password": "admin123"
}
```

Successful login sets an HTTP-only cookie named `binarymart_admin_token`.

Frontend usage:

```ts
await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({
    username: 'admin',
    password: 'admin123',
  }),
});
```

For protected product routes, send requests with `credentials: 'include'` so the browser includes the auth cookie.

Session/profile endpoints:

```txt
GET /api/auth/me
GET /api/admin/me
POST /api/auth/logout
```

## Product API

Available routes:

```txt
GET    /api/products
POST   /api/products
GET    /api/products/:id
PUT    /api/products/:id
DELETE /api/products/:id
```

`GET /api/products` supports:

```txt
?search=rog
?category=Laptop
?sort=name|price|rating|popularity|createdAt
?order=asc|desc
```

`DELETE /api/products/:id` is a soft delete and sets `isActive = false`.

You can use either Prisma `id` or product `slug` in `:id`.

### Product Request Body

Minimal body shape for create/update:

```json
{
  "name": "ASUS ROG Strix G16",
  "category": "Laptop",
  "brand": "ASUS",
  "description": "Laptop gaming bertenaga Intel Core i9 Gen 13 dan RTX 4060.",
  "image": "https://example.com/product.jpg",
  "price": 24999000,
  "rating": 4.8,
  "popularity": 120,
  "stock": 8,
  "specifications": {
    "CPU": "i9-13980HX",
    "RAM": "16GB DDR5",
    "Storage": "1TB SSD"
  }
}
```

Optional fields:

```txt
slug
isActive
```

Validation notes:

```txt
price >= 0
rating 0..5
popularity >= 0
stock >= 0
```
