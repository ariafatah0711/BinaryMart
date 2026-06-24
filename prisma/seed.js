const { PrismaClient } = require('@prisma/client');
const { randomBytes, scryptSync } = require('node:crypto');

const prisma = new PrismaClient();

function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');
  return `scrypt:${salt}:${hash}`;
}

const products = [
  {
    name: 'ASUS ROG Strix G16',
    slug: 'asus-rog-strix-g16',
    category: 'Laptop',
    brand: 'ASUS',
    price: 24999000,
    rating: 4.8,
    popularity: 120,
    stock: 8,
    description: 'Laptop gaming bertenaga Intel Core i9 Gen 13 dan RTX 4060.',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=500&q=80',
    specifications: { CPU: 'i9-13980HX', RAM: '16GB DDR5', Storage: '1TB SSD', GPU: 'RTX 4060 8GB' },
  },
  {
    name: 'iPhone 15 Pro',
    slug: 'iphone-15-pro',
    category: 'Smartphone',
    brand: 'Apple',
    price: 20999000,
    rating: 4.9,
    popularity: 250,
    stock: 15,
    description: 'Smartphone premium dengan casing titanium dan chip A17 Pro.',
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=500&q=80',
    specifications: { Chipset: 'A17 Pro', RAM: '8GB', Storage: '256GB', Screen: '6.1 Super Retina' },
  },
  {
    name: 'LG UltraGear 27GP850',
    slug: 'lg-ultragear-27gp850',
    category: 'Monitor',
    brand: 'LG',
    price: 5499000,
    rating: 4.7,
    popularity: 95,
    stock: 12,
    description: 'Monitor gaming Nano IPS 27 inci dengan refresh rate 165Hz.',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=500&q=80',
    specifications: { Resolution: 'QHD 2560x1440', RefreshRate: '165Hz', Panel: 'Nano IPS' },
  },
  {
    name: 'Keychron K2 V2',
    slug: 'keychron-k2-v2',
    category: 'Keyboard',
    brand: 'Keychron',
    price: 1450000,
    rating: 4.6,
    popularity: 180,
    stock: 20,
    description: 'Keyboard mekanikal wireless 75% layout dengan Gateron Switch.',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=500&q=80',
    specifications: { Layout: '75%', Connectivity: 'Bluetooth/Wired', Switches: 'Gateron Brown' },
  },
  {
    name: 'Logitech G Pro X Superlight',
    slug: 'logitech-g-pro-x-superlight',
    category: 'Mouse',
    brand: 'Logitech',
    price: 1999000,
    rating: 4.8,
    popularity: 310,
    stock: 25,
    description: 'Mouse gaming nirkabel super ringan yang didesain untuk atlet esports.',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=500&q=80',
    specifications: { Weight: '63g', Sensor: 'HERO 25K', Battery: '70 hours' },
  },
];

async function main() {
  await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {
      name: 'BinaryMart Admin',
      email: 'admin@binarymart.local',
      role: 'SUPER_ADMIN',
      isActive: true,
    },
    create: {
      username: 'admin',
      password: hashPassword('admin123'),
      name: 'BinaryMart Admin',
      email: 'admin@binarymart.local',
      role: 'SUPER_ADMIN',
      isActive: true,
    },
  });

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }

  console.log('Seed completed. Admin login: admin / admin123');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
