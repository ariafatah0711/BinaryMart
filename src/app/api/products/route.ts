import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 1. Ambil semua data produk dari database Neon
    const products = await prisma.product.findMany();

    // 2. Jika database kosong, kita sediakan data dummy untuk disisipkan
    if (products.length === 0) {
      const dummyProducts = [
        {
          name: "ASUS ROG Strix G16",
          category: "Laptop",
          brand: "ASUS",
          price: 24999000,
          rating: 4.8,
          popularity: 120,
          stock: 8,
          description: "Laptop gaming bertenaga Intel Core i9 Gen 13 dan RTX 4060.",
          image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=500&q=80",
          specifications: { CPU: "i9-13980HX", RAM: "16GB DDR5", Storage: "1TB SSD", GPU: "RTX 4060 8GB" }
        },
        {
          name: "iPhone 15 Pro",
          category: "Smartphone",
          brand: "Apple",
          price: 20999000,
          rating: 4.9,
          popularity: 250,
          stock: 15,
          description: "Smartphone premium dengan casing titanium dan chip A17 Pro.",
          image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=500&q=80",
          specifications: { Chipset: "A17 Pro", RAM: "8GB", Storage: "256GB", Screen: "6.1 Super Retina" }
        },
        {
          name: "LG UltraGear 27GP850",
          category: "Monitor",
          brand: "LG",
          price: 5499000,
          rating: 4.7,
          popularity: 95,
          stock: 12,
          description: "Monitor gaming Nano IPS 27 inci dengan refresh rate 165Hz.",
          image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=500&q=80",
          specifications: { Resolution: "QHD 2560x1440", RefreshRate: "165Hz", Panel: "Nano IPS" }
        },
        {
          name: "Keychron K2 V2",
          category: "Keyboard",
          brand: "Keychron",
          price: 1450000,
          rating: 4.6,
          popularity: 180,
          stock: 20,
          description: "Keyboard mekanikal wireless 75% layout dengan Gateron Switch.",
          image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=500&q=80",
          specifications: { Layout: "75%", Connectivity: "Bluetooth/Wired", Switches: "Gateron Brown" }
        },
        {
          name: "Logitech G Pro X Superlight",
          category: "Mouse",
          brand: "Logitech",
          price: 1999000,
          rating: 4.8,
          popularity: 310,
          stock: 25,
          description: "Mouse gaming nirkabel super ringan yang didesain untuk atlet esports.",
          image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=500&q=80",
          specifications: { Weight: "63g", Sensor: "HERO 25K", Battery: "70 hours" }
        }
      ];

      // Insert data dummy secara massal ke database Neon
      await prisma.product.createMany({
        data: dummyProducts
      });

      const initializedProducts = await prisma.product.findMany();
      return NextResponse.json({ success: true, database: "connected (seeded)", products: initializedProducts });
    }

    return NextResponse.json({ success: true, database: "connected", products });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, database: "failed", error: error.message },
      { status: 500 }
    );
  }
}
