import prisma from '@/lib/db';
import { fail, getErrorMessage, ok } from '@/lib/api-response';
import { getCurrentAdminToken } from '@/lib/session';
import { parseProductInput, ProductUpdateInput } from '@/lib/validation';

export const dynamic = 'force-dynamic';

interface RouteContext {
  params: {
    id: string;
  };
}

export async function GET(_: Request, { params }: RouteContext) {
  try {
    const product = await prisma.product.findFirst({
      where: {
        OR: [{ id: params.id }, { slug: params.id }],
        isActive: true,
      },
    });

    if (!product) return fail('Product not found', 404);

    return ok({ product });
  } catch (error) {
    return fail(getErrorMessage(error));
  }
}

export async function PUT(request: Request, { params }: RouteContext) {
  try {
    const admin = await getCurrentAdminToken();
    if (!admin) return fail('Unauthorized', 401);

    const existing = await prisma.product.findFirst({
      where: {
        OR: [{ id: params.id }, { slug: params.id }],
      },
    });

    if (!existing) return fail('Product not found', 404);

    const input = parseProductInput(await request.json(), true) as ProductUpdateInput;
    const product = await prisma.product.update({
      where: { id: existing.id },
      data: input,
    });

    return ok({ product });
  } catch (error) {
    return fail(getErrorMessage(error), 400);
  }
}

export async function DELETE(_: Request, { params }: RouteContext) {
  try {
    const admin = await getCurrentAdminToken();
    if (!admin) return fail('Unauthorized', 401);

    const existing = await prisma.product.findFirst({
      where: {
        OR: [{ id: params.id }, { slug: params.id }],
      },
    });

    if (!existing) return fail('Product not found', 404);

    const product = await prisma.product.update({
      where: { id: existing.id },
      data: { isActive: false },
    });

    return ok({ deleted: true, product });
  } catch (error) {
    return fail(getErrorMessage(error), 400);
  }
}
