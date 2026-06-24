import { Prisma } from '@prisma/client';
import { createSlug } from './slug';

export interface ProductCreateInput {
  name: string;
  slug: string;
  category: string;
  brand: string;
  price: number;
  rating?: number;
  popularity?: number;
  stock?: number;
  description: string;
  image: string;
  specifications?: Prisma.InputJsonValue;
  isActive?: boolean;
}

export type ProductUpdateInput = Partial<ProductCreateInput>;

function asString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function asNumber(value: unknown, fallback?: number) {
  if (value === undefined || value === null || value === '') return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

export function parseProductInput(body: unknown, partial = false): ProductCreateInput | ProductUpdateInput {
  const input = body as Record<string, unknown>;
  const name = asString(input.name);
  const category = asString(input.category);
  const brand = asString(input.brand);
  const description = asString(input.description);
  const image = asString(input.image);
  const price = asNumber(input.price, partial ? undefined : 0);
  const rating = asNumber(input.rating, 0);
  const popularity = asNumber(input.popularity, 0);
  const stock = asNumber(input.stock, 0);
  const isActive = typeof input.isActive === 'boolean' ? input.isActive : undefined;
  const specifications =
    input.specifications && typeof input.specifications === 'object'
      ? (input.specifications as Prisma.InputJsonValue)
      : {};

  if (!partial) {
    if (!name) throw new Error('Product name is required');
    if (!category) throw new Error('Product category is required');
    if (!brand) throw new Error('Product brand is required');
    if (!description) throw new Error('Product description is required');
    if (!image) throw new Error('Product image is required');
  }

  if (!partial || input.price !== undefined) {
    if (price === undefined || !Number.isFinite(price) || price < 0) {
      throw new Error('Product price must be a positive number');
    }
  }

  if (rating !== undefined && (!Number.isFinite(rating) || rating < 0 || rating > 5)) {
    throw new Error('Product rating must be between 0 and 5');
  }

  if (popularity !== undefined && (!Number.isFinite(popularity) || popularity < 0)) {
    throw new Error('Product popularity must be a positive number');
  }

  if (stock !== undefined && (!Number.isFinite(stock) || stock < 0)) {
    throw new Error('Product stock must be a positive number');
  }

  const parsed: ProductCreateInput = {
    name,
    slug: asString(input.slug) || createSlug(name),
    category,
    brand,
    price: price as number,
    rating,
    popularity,
    stock,
    description,
    image,
    specifications,
    isActive,
  };

  if (partial) {
    Object.keys(parsed).forEach((key) => {
      const typedKey = key as keyof ProductCreateInput;
      if (input[typedKey] === undefined && typedKey !== 'slug') {
        delete (parsed as ProductUpdateInput)[typedKey];
      }
    });

    if (!input.slug && !input.name) {
      delete (parsed as ProductUpdateInput).slug;
    }
  }

  return parsed;
}
