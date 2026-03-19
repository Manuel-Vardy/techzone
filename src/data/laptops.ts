import laptop1 from "@/assets/laptop-1.jpg";
import laptop2 from "@/assets/laptop-2.jpg";
import laptop3 from "@/assets/laptop-3.jpg";
import laptop4 from "@/assets/laptop-4.jpg";
import laptop5 from "@/assets/laptop-5.jpg";
import laptop6 from "@/assets/laptop-6.jpg";
import laptop7 from "@/assets/laptop-7.jpg";
import laptop8 from "@/assets/laptop-8.jpg";

export interface Laptop {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  images: string[];
  specs: {
    processor: string;
    ram: string;
    storage: string;
    display: string;
    graphics: string;
  };
  rating: number;
  reviews: number;
  badge?: string;
}

export const laptops: Laptop[] = [
  {
    id: "1",
    name: "ProBook Elite X1",
    brand: "TechZone",
    price: 1299,
    originalPrice: 1599,
    images: [laptop1, laptop2, laptop3, laptop4],
    specs: {
      processor: "Intel Core i7-13700H",
      ram: "16GB DDR5",
      storage: "512GB NVMe SSD",
      display: '15.6" FHD IPS',
      graphics: "RTX 4060",
    },
    rating: 4.8,
    reviews: 124,
    badge: "Best Seller",
  },
  {
    id: "2",
    name: "Gaming Beast Pro",
    brand: "TechZone",
    price: 1899,
    originalPrice: 2199,
    images: [laptop3, laptop1, laptop4, laptop2],
    specs: {
      processor: "AMD Ryzen 9 7945HX",
      ram: "32GB DDR5",
      storage: "1TB NVMe SSD",
      display: '17.3" QHD 165Hz',
      graphics: "RTX 4080",
    },
    rating: 4.9,
    reviews: 89,
    badge: "New",
  },
  {
    id: "3",
    name: "UltraSlim Air",
    brand: "TechZone",
    price: 999,
    originalPrice: 1199,
    images: [laptop2, laptop4, laptop1, laptop3],
    specs: {
      processor: "Intel Core i5-1340P",
      ram: "16GB LPDDR5",
      storage: "256GB NVMe SSD",
      display: '14" FHD+ IPS',
      graphics: "Intel Iris Xe",
    },
    rating: 4.6,
    reviews: 203,
    badge: "Popular",
  },
  {
    id: "4",
    name: "Workstation Max",
    brand: "TechZone",
    price: 2499,
    originalPrice: 2899,
    images: [laptop4, laptop3, laptop2, laptop1],
    specs: {
      processor: "Intel Xeon W-1390P",
      ram: "64GB DDR5 ECC",
      storage: "2TB NVMe SSD",
      display: '16" 4K OLED',
      graphics: "RTX A4000",
    },
    rating: 4.7,
    reviews: 56,
    badge: "Pro",
  },
  {
    id: "5",
    name: "Student Essential",
    brand: "TechZone",
    price: 599,
    originalPrice: 749,
    images: [laptop5, laptop6, laptop7, laptop8],
    specs: {
      processor: "AMD Ryzen 5 7530U",
      ram: "8GB DDR4",
      storage: "256GB SSD",
      display: '15.6" FHD',
      graphics: "AMD Radeon",
    },
    rating: 4.4,
    reviews: 312,
    badge: "Value",
  },
  {
    id: "6",
    name: "Creator Studio",
    brand: "TechZone",
    price: 1799,
    originalPrice: 2099,
    images: [laptop6, laptop5, laptop8, laptop7],
    specs: {
      processor: "Apple M2 Pro",
      ram: "16GB Unified",
      storage: "512GB SSD",
      display: '14.2" Liquid Retina XDR',
      graphics: "19-core GPU",
    },
    rating: 4.9,
    reviews: 178,
    badge: "Editor's Choice",
  },
];

export const brands = [
  { name: "Apple", logo: "🍎" },
  { name: "Lenovo", logo: "💻" },
  { name: "ASUS", logo: "🎮" },
  { name: "Dell", logo: "🖥️" },
  { name: "HP", logo: "📱" },
];
