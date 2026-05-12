export interface Shirt {
  id: string;
  name: string;
  brand: string;
  price: number;
  description: string;
  fibre: string;
  reviews: number;
  rating: number;
  company: string;
  modelAsset: number;
}

const shirt1 = require('../assets/models/shirt1.glb');
const shirt2 = require('../assets/models/shirt2.glb');
const shirt3 = require('../assets/models/shirt3.glb');
const shirt4 = require('../assets/models/shirt4.glb');
const shirt5 = require('../assets/models/shirt5.glb');
const shirt6 = require('../assets/models/shirt6.glb');
const shirt7 = require('../assets/models/shirt7.glb');

export const SHIRTS: Shirt[] = [
  {
    id: '1',
    name: 'Essential Tee',
    brand: 'NOIR',
    price: 89,
    description: 'Crafted from premium long-staple cotton, the Essential Tee delivers a clean silhouette with a relaxed fit. Minimal detailing lets the fabric speak for itself.',
    fibre: '100% Egyptian Cotton, 180 GSM',
    reviews: 234,
    rating: 4.8,
    company: 'NOIR Studios, Milan',
    modelAsset: shirt1,
  },
  {
    id: '2',
    name: 'Shadow Knit',
    brand: 'NOIR',
    price: 125,
    description: 'A structured knit with a contemporary edge. The Shadow Knit features a refined ribbed texture that holds its shape through every wear.',
    fibre: '80% Merino Wool, 20% Cashmere',
    reviews: 187,
    rating: 4.9,
    company: 'NOIR Studios, Milan',
    modelAsset: shirt2,
  },
  {
    id: '3',
    name: 'Void Linen',
    brand: 'NOIR',
    price: 110,
    description: 'Lightweight and breathable, the Void Linen is built for warm days. A relaxed drape and subtle texture give it effortless character.',
    fibre: '100% Belgian Linen, 150 GSM',
    reviews: 156,
    rating: 4.7,
    company: 'NOIR Studios, Milan',
    modelAsset: shirt3,
  },
  {
    id: '4',
    name: 'Obsidian Weave',
    brand: 'NOIR',
    price: 145,
    description: 'The Obsidian Weave combines Japanese selvedge denim with a modern cut. Raw indigo fades uniquely over time, making each piece one of a kind.',
    fibre: '100% Japanese Selvedge Denim, 14oz',
    reviews: 312,
    rating: 4.9,
    company: 'NOIR Studios, Milan',
    modelAsset: shirt4,
  },
  {
    id: '5',
    name: 'Phantom Silk',
    brand: 'NOIR',
    price: 195,
    description: 'Ultra-light silk blend with a matte finish. The Phantom Silk drapes like liquid, offering a refined look for evening wear.',
    fibre: '70% Mulberry Silk, 30% Wool',
    reviews: 98,
    rating: 4.8,
    company: 'NOIR Studios, Milan',
    modelAsset: shirt5,
  },
  {
    id: '6',
    name: 'Carbon Tech',
    brand: 'NOIR',
    price: 165,
    description: 'Engineered for performance with a luxury feel. Moisture-wicking and four-way stretch meet a minimalist aesthetic.',
    fibre: '92% Micro-Modal, 8% Elastane',
    reviews: 276,
    rating: 4.7,
    company: 'NOIR Studios, Milan',
    modelAsset: shirt6,
  },
  {
    id: '7',
    name: 'Eclipse Oxford',
    brand: 'NOIR',
    price: 135,
    description: 'A modern take on the classic Oxford cloth. Button-down collar with a slim fit that transitions from office to evening.',
    fibre: '100% Pima Cotton Oxford, 200 GSM',
    reviews: 201,
    rating: 4.6,
    company: 'NOIR Studios, Milan',
    modelAsset: shirt7,
  },
];
