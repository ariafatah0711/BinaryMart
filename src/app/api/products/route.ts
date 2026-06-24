import { Prisma } from '@prisma/client';
import prisma from '@/lib/db';
import { fail, getErrorMessage, ok } from '@/lib/api-response';
import { ProductSearchTree } from '@/lib/algorithms/bst';
import { quickSort, SortOrder, withOrder } from '@/lib/algorithms/quicksort';
import { getCurrentAdminToken } from '@/lib/session';
import { parseProductInput, ProductCreateInput } from '@/lib/validation';

export const dynamic = 'force-dynamic';

const sortableFields = ['name', 'price', 'rating', 'popularity', 'createdAt'] as const;
type SortableField = (typeof sortableFields)[number];

function getSortField(value: string | null): SortableField {
  return sortableFields.includes(value as SortableField) ? (value as SortableField) : 'name';
}

function compareProducts(field: SortableField) {
  return (left: Prisma.ProductGetPayload<object>, right: Prisma.ProductGetPayload<object>) => {
    const leftValue = left[field];
    const rightValue = right[field];

    if (leftValue instanceof Date && rightValue instanceof Date) {
      return leftValue.getTime() - rightValue.getTime();
    }

    if (typeof leftValue === 'string' && typeof rightValue === 'string') {
      return leftValue.localeCompare(rightValue);
    }

    return Number(leftValue) - Number(rightValue);
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.trim();
    const category = searchParams.get('category')?.trim();
    const sort = getSortField(searchParams.get('sort'));
    const order: SortOrder = searchParams.get('order') === 'desc' ? 'desc' : 'asc';

    let products = await prisma.product.findMany({
      where: {
        isActive: true,
        ...(category ? { category: { equals: category, mode: 'insensitive' } } : {}),
      },
    });

    if (search) {
      const tree = new ProductSearchTree<(typeof products)[number]>();
      products.forEach((product) => tree.insert(product));
      products = tree.search(search);
    }

    products = quickSort(products, withOrder(compareProducts(sort), order));

    return ok({
      database: 'connected',
      meta: {
        total: products.length,
        search: search || null,
        category: category || null,
        sort,
        order,
        algorithm: {
          search: search ? 'Binary Search Tree' : null,
          sort: 'QuickSort',
        },
      },
      products,
    });
  } catch (error) {
    return fail(getErrorMessage(error));
  }
}

export async function POST(request: Request) {
  try {
    const admin = await getCurrentAdminToken();
    if (!admin) return fail('Unauthorized', 401);

    const input = parseProductInput(await request.json()) as ProductCreateInput;
    const product = await prisma.product.create({ data: input });

    return ok({ product }, { status: 201 });
  } catch (error) {
    return fail(getErrorMessage(error), 400);
  }
}
